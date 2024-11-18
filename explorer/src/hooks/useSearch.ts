'use client'

import { useLazyQuery } from '@apollo/client'
import { isAddress, isHex } from '@autonomys/auto-utils'
import { GET_RESULTS } from 'components/common/queries'
import { INTERNAL_ROUTES } from 'constants/routes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatAddress } from 'utils//formatAddress'
import useChains from './useChains'

type Values = {
  handleSearch: (term: string, searchType: number) => void
  isSearching: boolean
}

export const useSearch = (): Values => {
  const [isSearching, setIsSearching] = useState(false)
  const { push } = useRouter()
  const { network, section } = useChains()

  const [getResults] = useLazyQuery(GET_RESULTS, { fetchPolicy: 'network-only' })

  const handleSearch = async (term: string, searchType: number) => {
    console.log('handleSearch', term, searchType)
    setIsSearching(true)

    switch (searchType) {
      // All
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
            isBlockHash: isHexFormat && typeof blockId === 'string',
            isEvent: typeof blockId === 'string',
          },
        })

        if (data?.accountById) push(INTERNAL_ROUTES.accounts.id.page(network, section, term))
        else if (data?.extrinsicById?.length > 0 && data?.eventById?.length > 0)
          push(INTERNAL_ROUTES.extrinsics.id.page(network, section, term))
        else if (data?.extrinsicById?.length > 0)
          push(INTERNAL_ROUTES.extrinsics.id.page(network, section, term))
        else if (data?.extrinsics?.length > 0)
          push(INTERNAL_ROUTES.extrinsics.id.page(network, section, data.extrinsics[0].id))
        else if (data?.blockById?.length > 0 && data.blockById[0].height >= 0)
          push(INTERNAL_ROUTES.blocks.id.page(network, section, Number(term)))
        else if (data?.blockByHash?.length > 0 && data.blockByHash[0].height >= 0)
          push(INTERNAL_ROUTES.blocks.hash.page(network, section, term))
        else if (data?.eventById) push(INTERNAL_ROUTES.events.id.page(network, section, term))
        else push(INTERNAL_ROUTES.search.empty(network, section))

        if (error) push(INTERNAL_ROUTES.notFound)

        setIsSearching(false)

        break
      }
      // Account
      case 2:
        if (!isAddress(term)) return push(INTERNAL_ROUTES.search.empty(network, section))
        return push(INTERNAL_ROUTES.accounts.id.page(network, section, term))
      // Block
      case 3: {
        const blockId = Number(term)
        if (isHex(term)) push(INTERNAL_ROUTES.blocks.hash.page(network, section, term))
        else if (isNaN(blockId)) push(INTERNAL_ROUTES.search.empty(network, section))
        else push(INTERNAL_ROUTES.blocks.id.page(network, section, Number(term)))
        break
      }
      // Extrinsic
      case 4:
        return push(INTERNAL_ROUTES.extrinsics.id.page(network, section, term))
      // Event
      case 5:
        return push(INTERNAL_ROUTES.events.id.page(network, section, term))
      default:
        return push(INTERNAL_ROUTES.search.empty(network, section))
    }
  }

  return {
    handleSearch,
    isSearching,
  }
}
