import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'

// common
import { Spinner } from 'common/components'

// layout
import { NotFound } from 'layout/components'

// log
import { QUERY_LOG_BY_ID } from 'Log/query'
import { LogDetailsCard, LogDetailsTab } from 'Log/components'

const Log: FC = () => {
  const { logId } = useParams()
  const { data, error, loading } = useQuery(QUERY_LOG_BY_ID, {
    variables: {
      logId: logId,
    },
  })

  useErrorHandler(error)

  if (loading) {
    return <Spinner />
  }

  if (!data.logById) {
    return <NotFound />
  }

  const log = data.logById

  return (
    <div className='w-full'>
      <LogDetailsCard log={log} />
      <LogDetailsTab events={log.block.events} />
    </div>
  )
}

export default Log
