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
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_BY_ID, {
    variables: {
      extrinsicId: extrinsicId,
    },
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

  const extrinsic = data.extrinsicById;

  return (
    <div className="w-full">
      <ExtrinsicDetailsCard extrinsic={extrinsic} />
      <ExtrinsicDetailsTab events={extrinsic.block.events} />
    </div>
  );
};

export default Extrinsic;
