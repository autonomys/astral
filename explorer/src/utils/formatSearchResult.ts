// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatSearchResult = (event: any, extrinsic: any) => {
  const formattedExtrinsic = {
    id: extrinsic.id,
    blockHeight: extrinsic.block?.height,
    indexInBlock: extrinsic.indexInBlock,
    timestamp: extrinsic.timestamp,
    action: extrinsic.name,
    type: 'Extrinsic',
  }

  const formattedEvent = {
    id: event.id,
    blockHeight: event.block?.height,
    indexInBlock: event.indexInBlock,
    timestamp: event.timestamp,
    action: event.name,
    type: 'Event',
  }

  const formattedResult = [formattedExtrinsic, formattedEvent]

  return formattedResult
}
