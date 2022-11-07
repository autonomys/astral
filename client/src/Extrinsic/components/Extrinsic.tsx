import { FC } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// common
import TableLoadingSkeleton from "common/components/TableLoadingSkeleton";

// extrinsic
import ExtrinsicDetailsCard from "Extrinsic/components/ExtrinsicDetailsCard";
import ExtrinsicDetailsTab from "Extrinsic/components/ExtrinsicDetailsTab";
import { QUERY_EXTRINSIC_BY_ID } from "Extrinsic/query";

const Extrinsic: FC = () => {
  const { extrinsicId } = useParams();

  const info = extrinsicId?.split("-");

  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_BY_ID, {
    variables: {
      blockId: Number(info?.[0]),
      pos: Number(info?.[1]),
    },
  });

  if (loading) {
    return <TableLoadingSkeleton withPagination={true} />;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  const [extrinsic] = data.extrinsics;

  return (
    <div className="w-full">
      <ExtrinsicDetailsCard extrinsic={extrinsic} />
      <ExtrinsicDetailsTab events={extrinsic.block.events} />
    </div>
  );
};

export default Extrinsic;
