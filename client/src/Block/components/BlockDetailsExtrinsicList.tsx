import { FC, useState } from 'react'
import { Extrinsic } from 'gql/graphql'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

// block
import { QUERY_BLOCK_EXTRINSICS } from 'Block/query'

// common
import { Table, Column, StatusIcon, Spinner, Pagination, ExtrinsicCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import { shortString } from 'common/helpers'
import useDomains from 'common/hooks/useDomains'

dayjs.extend(relativeTime)

type Props = {
  isDesktop?: boolean
}

const BlockDetailsExtrinsicList: FC<Props> = ({ isDesktop = false }) => {
  const { blockId } = useParams()
  const { selectedChain } = useDomains()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)
  const PAGE_SIZE = isDesktop ? 10 : 5

  const { data, error, loading } = useQuery(QUERY_BLOCK_EXTRINSICS, {
    variables: { blockId: Number(blockId), first: PAGE_SIZE, after: lastCursor },
  })

  if (error) {
    return (
      <div className='flex w-full mt-5 sm:mt-0 items-center justify-center'>
        <p className='text-gray-600 text-sm font-light dark:text-white'>There was an error</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex w-full mt-5 sm:mt-0 items-center justify-center'>
        <div className='h-20 w-20 '>
          <Spinner />
        </div>
      </div>
    )
  }

  const extrinsics = data.extrinsicsConnection.edges.map((extrinsic) => extrinsic.node)
  const totalCount = data.extrinsicsConnection.totalCount

  const pageInfo = data.extrinsicsConnection.pageInfo

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }

  const handleGetPage = (page: string | number) => {
    setCurrentPage(Number(page))
    const newCount = PAGE_SIZE * Number(page)
    const endCursor = newCount - PAGE_SIZE
    if (endCursor === 0) {
      return setLastCursor(undefined)
    }
    setLastCursor(endCursor.toString())
  }

  // methods
  const generateColumns = (extrinsics: Extrinsic[]): Column[] => [
    {
      title: 'Extrinsic Id',
      cells: extrinsics.map(({ block, pos, id }) => (
        <Link
          key={`${id}-block-extrinsic-id`}
          className='hover:text-[#DE67E4]'
          to={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, id)}
        >
          {`${block.height}-${pos}`}
        </Link>
      )),
    },
    {
      title: 'Block hash',
      cells: extrinsics.map(({ hash, id }) => (
        <div key={`${id}-block-extrinsic-hash`}>{shortString(hash)}</div>
      )),
    },
    {
      title: 'Action',
      cells: extrinsics.map(({ name, id }) => (
        <div key={`${id}-block-extrinsic-action`}>{name.split('.')[1].toUpperCase()}</div>
      )),
    },
    {
      title: 'Time',
      cells: extrinsics.map(({ block, id }) => {
        const blockDate = dayjs(block.timestamp).fromNow(true)

        return <div key={`${id}-block-extrinsic-time`}>{blockDate}</div>
      }),
    },
    {
      title: 'Status',
      cells: extrinsics.map(({ id, success }) => (
        <div
          className='md:flex md:items-center md:justify-start md:pl-5'
          key={`${id}-home-extrinsic-status`}
        >
          <StatusIcon status={success} />
        </div>
      )),
    },
  ]

  // constants
  const columns = generateColumns(extrinsics)

  return (
    <div className='w-full flex flex-col mt-5 sm:mt-0 space-y-4'>
      <>
        {isDesktop ? (
          <Table
            columns={columns}
            emptyMessage='There are no extrinsics to show'
            id='block-details-extrinsics-list'
          />
        ) : (
          <div className='flex flex-col'>
            {extrinsics.map((extrinsic) => (
              <ExtrinsicCard
                id='block-details-extrinsic-mobile'
                key={`block-details-extrinsic-card-${extrinsic.id}`}
                extrinsic={extrinsic}
              />
            ))}
          </div>
        )}
      </>

      <Pagination
        nextPage={handleNextPage}
        previousPage={handlePreviousPage}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
        totalCount={totalCount}
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
        handleGetPage={handleGetPage}
      />
    </div>
  )
}

export default BlockDetailsExtrinsicList
