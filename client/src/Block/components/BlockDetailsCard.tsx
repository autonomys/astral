import { FC } from "react";
import { Block } from "gql/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// common
import { List, StyledListItem } from "common/components/List";

dayjs.extend(relativeTime);

type Props = {
  block: Block;
};

const BlockDetailsCard: FC<Props> = ({ block }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-semibold leading-none text-gray-900 text-2xl">
          Block #{block.height}
        </h3>
      </div>
      <div className="border border-slate-100 bg-white shadow rounded-lg mb-4 p-4 sm:p-6 w-full">
        <div className="flow-root">
          <List>
            <StyledListItem title="Timestamp">
              {dayjs(block.timestamp).format("DD MMM YYYY | HH:mm:ss(Z)")}
            </StyledListItem>
            <StyledListItem title="Block Time">
              {dayjs(block.timestamp).fromNow(true)}
            </StyledListItem>
            <StyledListItem title="Hash">{block.hash}</StyledListItem>
            <StyledListItem title="Parent Hash">
              {block.parentHash}
            </StyledListItem>
            <StyledListItem title="Extrinsics Root">
              {block?.extrinsicRoot}
            </StyledListItem>
            <StyledListItem title="Spec Version">
              {block.specId?.toString() || ""}
            </StyledListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export default BlockDetailsCard;
