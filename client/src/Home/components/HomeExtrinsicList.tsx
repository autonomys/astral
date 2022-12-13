import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { ApolloError } from '@apollo/client'

// common
import { Table, Column, StatusIcon, TableLoadingSkeleton } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'

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

const HomeExtrinsicList: FC<HomeExtrinsicListProps> = ({ data, error, loading, isDesktop }) => {
  if (loading) {
    return <TableLoadingSkeleton additionClass='lg:w-1/2' />
  }

  if (error || !data) {
    return (
      <div className='flex-col p-4 md:w-full border border-gray-200 rounded-lg bg-white'>
        <div className='inline-flex justify-between items-center align-middle w-full mb-6'>
          <div className='text-gray-600 uppercase text-md leading-normal'>Latest Extrinsics</div>
        </div>
        <Table
          columns={[]}
          emptyMessage='There was an error getting this information'
          id='home-latest-extrinsics'
        />
      </div>
    )
  }

  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'ID',
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link key={`${id}-home-extrinsic-id`} to={INTERNAL_ROUTES.extrinsics.id.page(id)}>
          <div>{`${pos}.${block.height}`}</div>
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
    <div className='flex-col p-4 md:w-full border border-gray-200 rounded-lg bg-white'>
      <div className='inline-flex justify-between items-center align-middle w-full mb-6'>
        <div className='text-gray-600 uppercase text-md leading-normal'>Latest Extrinsics</div>
        <Link
          to={INTERNAL_ROUTES.extrinsics.list}
          className='px-2 py-2 transition ease-in-out duration-150'
        >
          <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
        </Link>
      </div>
      <Table
        columns={columns}
        emptyMessage='There are no extrinsics to show'
        id='home-latest-extrinsics'
      />
    </div>
  ) : (
    <div className='w-full'>
      <div className='inline-flex justify-between items-center align-middle w-full mb-6'>
        <div className='text-gray-600 uppercase text-md leading-normal'>Latest Extrinsics</div>
        <Link
          to={INTERNAL_ROUTES.extrinsics.list}
          className='px-2 py-2 transition ease-in-out duration-150'
        >
          <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
        </Link>
      </div>
      {extrinsics.map((extrinsic) => (
        <HomeExtrinsicCard extrinsic={extrinsic} key={`home-extrinsic-card-${extrinsic.id}`} />
      ))}
    </div>
  )
}

export default HomeExtrinsicList
