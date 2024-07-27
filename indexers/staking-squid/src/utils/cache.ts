import type { Store } from "@subsquid/typeorm-store";
import type {
  Deposit,
  Domain,
  Nominator,
  Operator,
  Stats,
  StatsPerDomain,
  StatsPerOperator,
  Withdrawal,
} from "../model";
import type { Ctx } from "../processor";

export type Cache = {
  domains: Map<string, Domain>;
  operators: Map<string, Operator>;
  nominators: Map<string, Nominator>;
  deposits: Map<string, Deposit>;
  withdrawals: Map<string, Withdrawal>;

  stats: Map<string, Stats>;
  statsPerDomain: Map<string, StatsPerDomain>;
  statsPerOperator: Map<string, StatsPerOperator>;
};

export const initCache: Cache = {
  domains: new Map(),
  operators: new Map(),
  nominators: new Map(),
  deposits: new Map(),
  withdrawals: new Map(),

  stats: new Map(),
  statsPerDomain: new Map(),
  statsPerOperator: new Map(),
};

export const save = async (ctx: Ctx<Store>, cache: Cache) =>
  Object.keys(cache).forEach(
    async (key) => await ctx.store.save([...cache[key as keyof Cache].values()])
  );
