import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { ApolloError } from '@apollo/client'

// common
import { Table, Column, StatusIcon } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { shortString } from 'common/helpers'

// gql
import { Extrinsic } from 'gql/graphql'

// home
import { HomeExtrinsicCard } from 'Home/components'

dayjs.extend(relativeTime)

interface HomeExtrinsicListProps {
  loading: boolean
  error?: ApolloError | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  isDesktop: boolean
}

const HomeExtrinsicListHeader = () => (
  <div className='inline-flex justify-between items-center align-middle w-full mb-6'>
    <div className='text-gray-600 dark:text-white uppercase text-md leading-normal'>
      Latest Extrinsics
    </div>
    <Link
      to={INTERNAL_ROUTES.extrinsics.list}
      className='px-2 py-2 transition ease-in-out duration-150'
    >
      <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
    </Link>
  </div>
)

const HomeExtrinsicList: FC<HomeExtrinsicListProps> = ({ data, isDesktop }) => {
  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'Hash',
      cells: extrinsics.map(({ id, hash }) => (
        <Link key={`${id}-home-extrinsic-hash`} to={INTERNAL_ROUTES.extrinsics.id.page(id)}>
          <div>{shortString(hash)}</div>
        </Link>
      )),
    },
    {
      title: 'Block',
      cells: extrinsics.map(({ block, id }) => (
        <div key={`${id}-home-extrinsic-block`}>{block.height}</div>
      )),
    },
    {
      title: 'Call',
      cells: extrinsics.map(({ name, id }) => (
        <div key={`${id}-home-extrinsic-action`}>{name.split('.')[1].toUpperCase()}</div>
      )),
    },
    {
      title: 'Time',
      cells: extrinsics.map(({ block, id }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true)

        return <div key={`${id}-home-extrinsic-time`}>{blockDate} ago</div>
      }),
    },
    {
      title: 'Status',
      cells: extrinsics.map(({ id, success }) => (
        <div className='flex items-center justify-center' key={`${id}-home-extrinsic-status`}>
          <StatusIcon status={success} />
        </div>
      )),
    },
  ]

  // constants
  const extrinsics = data.extrinsics
  const columns = generateColumns(extrinsics)

  return isDesktop ? (
    <div className='flex-col p-4 w-full border border-gray-200 dark:border-none rounded-lg bg-white dark:bg-gradient-to-r dark:from-[#3A2D85] dark:to-[#678CD5]'>
      <HomeExtrinsicListHeader />
      <Table
        columns={columns}
        emptyMessage='There are no extrinsics to show'
        id='home-latest-extrinsics'
      />
    </div>
  ) : (
    <div className='w-full'>
      <HomeExtrinsicListHeader />
      {extrinsics.map((extrinsic) => (
        <HomeExtrinsicCard extrinsic={extrinsic} key={`home-extrinsic-card-${extrinsic.id}`} />
      ))}
    </div>
  )
}

export default HomeExtrinsicList
