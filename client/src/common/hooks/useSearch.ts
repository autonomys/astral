import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { isHex } from '@polkadot/util'
import { isAddress } from '@polkadot/util-crypto'

// common
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'
import { formatAddress } from 'common/helpers/formatAddress'
import { GET_RESULTS } from 'common/queries'
import { formatSearchResult } from 'common/helpers/formatSearchResult'

type Values = {
  handleSearch: (term: string, searchType: number) => void
  isSearching: boolean
}

const useSearch = (): Values => {
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()
  const { selectedChain } = useDomains()

  const [getResults] = useLazyQuery(GET_RESULTS, { fetchPolicy: 'network-only' })

  const handleSearch = async (term: string, searchType: number) => {
    setIsSearching(true)

    switch (searchType) {
      case 1: {
        const address = formatAddress(term)
        const isHexFormat = isHex(term)
        const blockId = (!isHexFormat && Number(term)) || term

        const { data, error } = await getResults({
          variables: {
            term,
            blockId: typeof blockId === 'number' ? blockId : -1,
            isAccount: !isHexFormat && !!address,
            isExtrinsic: typeof blockId === 'string',
            isExtrinsicHash: typeof blockId === 'string' && isHexFormat && Boolean(address),
            isBlock: !isHexFormat && typeof blockId === 'number',
            isEvent: typeof blockId === 'string',
          },
        })

        if (data?.accountById) {
          navigate(INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, term))
        } else if (data?.extrinsicById && data?.eventById) {
          const results = formatSearchResult(data.eventById, data.extrinsicById)
          navigate(
            INTERNAL_ROUTES.search.result.page(selectedChain.urls.page, 'extrinsicAndEvent'),
            {
              state: { results },
            },
          )
        } else if (data?.extrinsicById) {
          navigate(INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, term))
        } else if (data?.extrinsics?.length > 0) {
          if (data.extrinsics.length > 1) {
            navigate(INTERNAL_ROUTES.search.result.page(selectedChain.urls.page, 'extrinsics'), {
              state: { extrinsics: data.extrinsics },
            })
          } else {
            const [extrinsic] = data.extrinsics
            navigate(INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, extrinsic.id))
          }
        } else if (data?.blocks?.length > 0 && data.blocks[0].height >= 0) {
          navigate(INTERNAL_ROUTES.blocks.id.page(selectedChain.urls.page, Number(term)))
        } else if (data?.eventById) {
          navigate(INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, term))
        } else {
          navigate(INTERNAL_ROUTES.notFound)
        }

        if (error) {
          navigate(INTERNAL_ROUTES.notFound)
        }

        setIsSearching(false)

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

  return {
    handleSearch,
    isSearching,
  }
}

export default useSearch
