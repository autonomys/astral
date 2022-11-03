import { FC } from "react";

import Tabs from "common/components/Tabs";
import { Event, Extrinsic } from "gql/graphql";
import BlockDetailsExtrinsicList from "./BlockDetailsExtrinsicList";
import BlockDetailsEventList from "./BlockDetailsEventList";

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

  return (
    <>
      <Tabs id="block-details-tab" color="pink" tabs={tabs} />
    </>
  );
};

export default BlockDetailsTabs;
