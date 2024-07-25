'use client'

import { useLazyQuery } from '@apollo/client'
import { isAddress, isHex } from '@autonomys/auto-utils'
import { GET_RESULTS } from 'components/common/queries'
import { INTERNAL_ROUTES } from 'constants/routes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatAddress } from 'utils//formatAddress'
import { formatSearchResult } from 'utils//formatSearchResult'
import useDomains from './useDomains'

type Values = {
  handleSearch: (term: string, searchType: number) => void
  isSearching: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any
}

export const useSearch = (): Values => {
  const [isSearching, setIsSearching] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, setState] = useState<any>({})
  const { push } = useRouter()
  const { selectedChain, selectedDomain } = useDomains()

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
          push(INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, selectedDomain, term))
        } else if (data?.extrinsicById && data?.eventById) {
          setState(formatSearchResult(data.eventById, data.extrinsicById))
          push(
            `/${selectedChain.urls.page}/${selectedDomain}/${INTERNAL_ROUTES.search.result.page(
              selectedChain.urls.page,
              selectedDomain,
              'extrinsicAndEvent',
            )}`,
          )
        } else if (data?.extrinsicById) {
          push(INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, term))
        } else if (data?.extrinsics?.length > 0) {
          if (data.extrinsics.length > 1) {
            setState({ extrinsics: data.extrinsics })
            push(
              `/${selectedChain.urls.page}/${selectedDomain}/${INTERNAL_ROUTES.search.result.page(
                selectedChain.urls.page,
                selectedDomain,
                'extrinsics',
              )}`,
            )
          } else {
            const [extrinsic] = data.extrinsics
            push(
              INTERNAL_ROUTES.extrinsics.id.page(
                selectedChain.urls.page,
                selectedDomain,
                extrinsic.id,
              ),
            )
          }
        } else if (data?.blocks?.length > 0 && data.blocks[0].height >= 0) {
          push(
            INTERNAL_ROUTES.blocks.id.page(selectedChain.urls.page, selectedDomain, Number(term)),
          )
        } else if (data?.eventById) {
          push(INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, term))
        } else {
          push(INTERNAL_ROUTES.search.empty(selectedChain.urls.page, selectedDomain))
        }

        if (error) {
          push(INTERNAL_ROUTES.notFound)
        }

        setIsSearching(false)

        break
      }
      case 2: {
        const blockId = Number(term)
        if (isNaN(blockId)) {
          return push(INTERNAL_ROUTES.search.empty(selectedChain.urls.page, selectedDomain))
        }
        push(INTERNAL_ROUTES.blocks.id.page(selectedChain.urls.page, selectedDomain, Number(term)))
        break
      }
      case 3:
        return push(
          INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, term),
        )
      case 4:
        if (!isAddress(term)) {
          return push(INTERNAL_ROUTES.search.empty(selectedChain.urls.page, selectedDomain))
        }
        return push(INTERNAL_ROUTES.accounts.id.page(selectedChain.urls.page, selectedDomain, term))
      case 5:
        return push(INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, term))
      default:
        return push(INTERNAL_ROUTES.search.empty(selectedChain.urls.page, selectedDomain))
    }
  }

  return {
    handleSearch,
    isSearching,
    state,
  }
}
