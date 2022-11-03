import { FC } from "react";
import { Event, Extrinsic } from "gql/graphql";

// common
import Tabs from "common/components/Tabs";

// block
import BlockDetailsExtrinsicList from "Block/components/BlockDetailsExtrinsicList";
import BlockDetailsEventList from "Block/components/BlockDetailsEventList";

type Props = {
  events: Event[];
  extrinsics: Extrinsic[];
};

const BlockDetailsTabs: FC<Props> = ({ events, extrinsics }) => {
  const tabs = [
    {
      title: "Extrinsics",
      content: <BlockDetailsExtrinsicList extrinsics={extrinsics} />,
    },
    {
      title: "Events",
      content: <BlockDetailsEventList events={events} />,
    },
    {
      title: "Logs",
      content: "Logs list",
    },
  ];

  return <Tabs id="block-details-tab" tabs={tabs} />;
};

export default BlockDetailsTabs;
