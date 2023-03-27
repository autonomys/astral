import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

// common
import { INTERNAL_ROUTES } from 'common/routes'

// block
import { QUERY_BLOCK_BY_ID } from 'Block/query'

// account
import { QUERY_ACCOUNT_BY_ID } from 'Account/query'

// extrinsic
import { QUERY_EXTRINSIC_BY_ID } from 'Extrinsic/query'

// event
import { QUERY_EVENT_BY_ID } from 'Event/query'
import useDomains from 'common/hooks/useDomains'
import { formatAddress } from 'common/helpers/formatAddress'
import { isAddress } from '@polkadot/util-crypto'

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { selectedChain } = useDomains()

  const [getEvent] = useLazyQuery(QUERY_EVENT_BY_ID, {
    onCompleted: (data) => {
      if (data.eventById) {
        navigate(INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, searchTerm))
      } else {
        navigate(INTERNAL_ROUTES.notFound)
      }
    },
  })

  const [getExtrinsic] = useLazyQuery(QUERY_EXTRINSIC_BY_ID, {
    onCompleted: (data) => {
      if (data.extrinsicById) {
        navigate(INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, searchTerm))
      } else {
        getEvent({ variables: { eventId: searchTerm } })
      }
    },
  })

  const [getBlock] = useLazyQuery(QUERY_BLOCK_BY_ID, {
    onCompleted: (data) => {
      if (data.blocks[0] && data.blocks[0].height > 0) {
        const blockId = Number(searchTerm)
        navigate(INTERNAL_ROUTES.blocks.id.page(selectedChain.urls.page, blockId))
      } else {
        getExtrinsic({ variables: { extrinsicId: searchTerm } })
      }
    },
  })

  const [getAccount] = useLazyQuery(QUERY_ACCOUNT_BY_ID, {
    onCompleted: (data) => {
      if (data.accountById) {
        navigate(INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, searchTerm))
      } else {
        const blockId = Number(searchTerm)
        if (isNaN(blockId)) {
          getExtrinsic({ variables: { extrinsicId: searchTerm } })
        } else {
          getBlock({ variables: { blockId: Number(searchTerm) } })
        }
      }
    },
  })

  const handleSearch = (term: string, searchType: number) => {
    setSearchTerm(term)

    switch (searchType) {
      case 1: {
        const address = formatAddress(term)

        getAccount({ variables: { accountId: address || searchTerm } })

        break
      }
      case 2: {
        const blockId = Number(term)
        if (isNaN(blockId)) {
          return navigate(INTERNAL_ROUTES.notFound)
        }
        navigate(INTERNAL_ROUTES.blocks.id.page(selectedChain.urls.page, Number(term)))
        break
      }
      case 3:
        return navigate(INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, term))
      case 4:
        if (!isAddress(term)) {
          return navigate(INTERNAL_ROUTES.notFound)
        }
        return navigate(INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, term))
      case 5:
        return navigate(INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, term))
      default:
        return navigate(INTERNAL_ROUTES.notFound)
    }
  }

  return handleSearch
}

export default useSearch
