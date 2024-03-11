/* eslint-disable camelcase */
import { FilterForm } from 'components/common/FilterForm'
import { EventWhereInput } from 'gql/graphql'
import { FC, useCallback, useState } from 'react'

type Props = {
  title: React.ReactNode
  filters: EventWhereInput
  setFilters: React.Dispatch<React.SetStateAction<EventWhereInput>>
  modules: string[]
}

export const EventListFilter: FC<Props> = ({ title, setFilters, filters, modules }) => {
  const [where, setWhere] = useState<EventWhereInput>(filters)

  const handleAccountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWhere((prev) => ({ ...prev, extrinsic: { signer: { id_eq: e.target.value } } }))
  }, [])

  return (
    <FilterForm
      title={title}
      where={where}
      filters={filters}
      modules={modules}
      setWhere={setWhere}
      setFilters={setFilters}
      handleAccountChange={handleAccountChange}
      account={where?.extrinsic?.signer?.id_eq || ''}
    />
  )
}
