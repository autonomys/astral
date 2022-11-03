import { FC } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";

// block
import { QUERY_BLOCK_BY_ID } from "Block/query";
import BlockDetailsCard from "./BlockDetailsCard";
import BlockDetailsTabs from "./BlockDetailsTabs";

const Block: FC = () => {
  const { blockId } = useParams();

  const { data, error, loading } = useQuery(QUERY_BLOCK_BY_ID, {
    variables: { blockId: Number(blockId) },
  });

  if (loading) {
    return <TableLoadingSkeleton withPagination={true} />;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  const [block] = data.blocks;

  return (
    <div className="w-full">
      <BlockDetailsCard block={block} />
      <BlockDetailsTabs events={block.events} extrinsics={block.extrinsics} />
    </div>
  );
};

export default Block;
