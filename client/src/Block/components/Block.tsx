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
    //return <TableLoadingSkeleton withPagination={true} />;
    return (
      <div className=" w-full min-h-screen flex justify-center items-center">
        <div className="flex min-h-screen w-full items-center justify-center ">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#ABCFEF] via-[#929EEA] to-[#91D3A0] animate-spin">
            <div className="h-9 w-9 rounded-full background-gradient"></div>
          </div>
        </div>
      </div>
    );
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
