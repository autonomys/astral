import { shortString } from '@/utils/string'
import { useQuery } from '@apollo/client'
import { ExtrinsicCard } from 'components/common/ExtrinsicCard'
import { Pagination } from 'components/common/Pagination'
import { Spinner } from 'components/common/Spinner'
import { StatusIcon } from 'components/common/StatusIcon'
import { Column, Table } from 'components/common/Table'
import { INTERNAL_ROUTES } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Extrinsic, ExtrinsicsByBlockIdQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FC, useCallback, useMemo, useState } from 'react'
import { QUERY_BLOCK_EXTRINSICS } from './query'

dayjs.extend(relativeTime)

type Props = {
  isDesktop?: boolean
}

export const BlockDetailsExtrinsicList: FC<Props> = ({ isDesktop = false }) => {
  const { blockId } = useParams()
  const { selectedChain, selectedDomain } = useDomains()
  const [currentPage, setCurrentPage] = useState(0)
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined)

  const first = useMemo(() => (isDesktop ? 10 : 5), [isDesktop])
  const { data, error, loading } = useQuery<ExtrinsicsByBlockIdQuery>(QUERY_BLOCK_EXTRINSICS, {
    variables: { blockId: Number(blockId), first, after: lastCursor },
  })

  const extrinsicsConnection = useMemo(() => data && data.extrinsicsConnection, [data])
  const extrinsics = useMemo(
    () =>
      extrinsicsConnection &&
      extrinsicsConnection.edges.map((extrinsic) => extrinsic.node as Extrinsic),
    [extrinsicsConnection],
  )
  const totalCount = useMemo(
    () => extrinsicsConnection && extrinsicsConnection.totalCount,
    [extrinsicsConnection],
  )
  const pageInfo = useMemo(
    () => extrinsicsConnection && extrinsicsConnection.pageInfo,
    [extrinsicsConnection],
  )

  const handleNextPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev + 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const handlePreviousPage = useCallback(() => {
    if (!pageInfo) return
    setCurrentPage((prev) => prev - 1)
    setLastCursor(pageInfo.endCursor)
  }, [pageInfo])

  const onChange = useCallback(
    (page: number) => {
      setCurrentPage(Number(page))

      const newCount = page > 0 ? first * Number(page + 1) : first
      const endCursor = newCount - first

      if (endCursor === 0 || endCursor < 0) return setLastCursor(undefined)
      setLastCursor(endCursor.toString())
    },
    [first],
  )

  const generateColumns = useCallback(
    (extrinsics: Extrinsic[]): Column[] => [
      {
        title: 'Extrinsic Id',
        cells: extrinsics.map(({ block, indexInBlock, id }) => (
          <Link
            key={`${id}-block-extrinsic-id`}
            className='hover:text-purpleAccent'
            href={INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, id)}
          >
            {`${block.height}-${indexInBlock}`}
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
    ],
    [selectedChain.urls.page, selectedDomain],
  )

  const columns = useMemo(
    () => extrinsics && generateColumns(extrinsics),
    [extrinsics, generateColumns],
  )

  if (error)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )
  if (loading)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <div className='size-20 '>
          <Spinner />
        </div>
      </div>
    )
  if (!data || !columns || !extrinsics)
    return (
      <div className='mt-5 flex w-full items-center justify-center sm:mt-0'>
        <p className='text-sm font-light text-gray-600 dark:text-white'>There was an error</p>
      </div>
    )

  return (
    <div className='mt-5 flex w-full flex-col space-y-4 sm:mt-0'>
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
      {totalCount && pageInfo && (
        <Pagination
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
          currentPage={currentPage}
          pageSize={first}
          totalCount={totalCount}
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
          onChange={onChange}
        />
      )}
    </div>
  )
}
