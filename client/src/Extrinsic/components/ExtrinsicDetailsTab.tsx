import { FC } from "react";
import { Event } from "gql/graphql";

// common
import Tabs from "common/components/Tabs";

// extrinsic
import ExtrinsicDetailsEventList from "Extrinsic/components/ExtrinsicDetailsEventList";

type Props = {
  events: Event[];
};

const ExtrinsicDetailsTab: FC<Props> = ({ events }) => {
  const tabs = [
    {
      title: "Events",
      content: <ExtrinsicDetailsEventList events={events} />,
    },
  ];

  return <Tabs id="block-details-tab" tabs={tabs} />;
};

export default ExtrinsicDetailsTab;
