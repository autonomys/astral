import { ApiPromise, WsProvider } from "@polkadot/api";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";

import { getOrCreateNominators, getOrCreateOperator } from "./blocks/utils";
import { RewardEvent } from "./model";
import { ProcessorContext, processor } from "./processor";
import { events } from "./types";

const types = {
  Solution: {
    public_key: "AccountId32",
    reward_address: "AccountId32",
  },
  SubPreDigest: {
    slot: "u64",
    solution: "Solution",
  },
};

processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
  const provider = new WsProvider(process.env.RPC_ENDPOINT);
  const api = await ApiPromise.create({ provider, types });

  let operatorRewards = await getOperatorEvents(ctx, api);
  await ctx.store.save([...operatorRewards]);
});

async function getOperatorEvents(
  ctx: ProcessorContext<Store>,
  api: ApiPromise
): Promise<RewardEvent[]> {
  const operatorEvents: RewardEvent[] = [];

  const updateEvents = [
    events.domains.operatorDeregistered.name,
    events.domains.operatorSlashed.name,
    events.domains.operatorSwitchedDomain.name,
  ];

  for (let block of ctx.blocks) {
    for (let event of block.events) {
      if (event.name === events.domains.operatorRegistered.name) {
        const { operatorId } =
          events.domains.operatorRegistered.v0.decode(event);
        const operator = await getOrCreateOperator(
          ctx,
          operatorId,
          block.header.height,
          api
        );
        if (operator) {
          await ctx.store.save(operator);
        }
      }

      if (updateEvents.includes(event.name)) {
        const { operatorId } =
          events.domains.operatorDeregistered.v0.decode(event);
        let operator = await getOrCreateOperator(
          ctx,
          operatorId,
          block.header.height,
          api
        );
        const operatorInfo = (
          await api.query.domains.operators(operatorId)
        ).toJSON() as any;

        if (operator) {
          operator.currentDomainId = operatorInfo.currentDomainId;
          operator.nextDomainId = operatorInfo.nextDomainId;
          operator.status = event.name;
          operator.updatedAt = BigInt(block.header.height);
          await ctx.store.save(operator);
        }
      }

      if (event.name === events.domains.operatorRewarded.name) {
        const { operatorId, reward } =
          events.domains.operatorRewarded.v0.decode(event);

        let operator = await getOrCreateOperator(
          ctx,
          operatorId,
          block.header.height,
          api
        );

        if (operator) {
          const operatorReward = new RewardEvent({
            id: `${event.id}-${operator.id}`,
            indexInBlock: event.index,
            name: event.name,
            timestamp: block.header.timestamp
              ? new Date(block.header.timestamp)
              : undefined,
            blockNumber: block.header.height,
            extrinsicHash: event.extrinsic?.hash,
            amount: reward,
            isOperator: true,
            operatorId: Number(operator.id),
          });

          operatorEvents.push(operatorReward);

          const nominators = await getOrCreateNominators(ctx, api, operator);

          for (let nominator of nominators) {
            const nominatorReward = new RewardEvent({
              id: `${event.id}-${nominator.id}`,
              indexInBlock: event.index,
              name: event.name,
              timestamp: block.header.timestamp
                ? new Date(block.header.timestamp)
                : undefined,
              blockNumber: block.header.height,
              extrinsicHash: event.extrinsic?.hash,
              account: nominator.account,
              amount: reward,
              isOperator: false,
              operatorId: Number(operator.id),
            });

            operatorEvents.push(nominatorReward);
          }
        }
      }
    }
  }

  return operatorEvents;
}
