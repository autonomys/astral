import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

// common
import Spinner from 'common/components/Spinner'
import ErrorFallback from 'common/components/ErrorFallback'

// layout
import NotFound from 'layout/components/NotFound'

// log
import { QUERY_LOG_BY_ID } from 'Log/query'
import LogDetailsCard from 'Log/components/LogDetailsCard'
import LogDetailsTab from 'Log/components/LogDetailsTab'

const Log: FC = () => {
  const { logId } = useParams()
  const { data, error, loading } = useQuery(QUERY_LOG_BY_ID, {
    variables: {
      logId: logId,
    },
  })

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <ErrorFallback error={error} />
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
