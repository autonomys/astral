import { FC } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ReactJson from 'react-json-view'

// common
import { List, StyledListItem } from 'common/components/List'

dayjs.extend(relativeTime)

type Props = {
  extrinsic: Extrinsic
}

const ExtrinsicDetailsCard: FC<Props> = ({ extrinsic }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-semibold leading-none text-gray-900 text-2xl">
          Extrinsic #{extrinsic.block.height}-{extrinsic.pos}
        </h3>
      </div>
      <div className="flex">
        <div className="border border-slate-100 bg-white shadow rounded-lg mb-4 p-4 sm:p-6 w-full">
          <div className="flow-root">
            <List>
              <StyledListItem
                title="Timestamp"
                value={dayjs(extrinsic.block.timestamp).format(
                  'DD MMM YYYY | HH:mm:ss(Z)',
                )}
              />
              <StyledListItem
                title="Block Time"
                value={dayjs(extrinsic.block.timestamp).fromNow(true)}
              />
              <StyledListItem title="Hash" value={extrinsic.hash} />
              <StyledListItem title="Module" value={extrinsic.call.name} />
              <StyledListItem title="Call" value={extrinsic.call.name} />
            </List>
          </div>
        </div>
        <div className="border border-slate-100 bg-white shadow rounded-lg ml-4 mb-4 p-4 sm:p-6 w-full">
          <ReactJson iconStyle="circle" src={{}} />
        </div>
      </div>
    </div>
  )
}

export default ExtrinsicDetailsCard
