import { Event, Extrinsic } from 'gql/graphql'

export const formatSearchResult = (event: Event, extrinsic: Extrinsic) => {
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
