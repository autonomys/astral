/* eslint-disable camelcase */
import { FC, useState } from 'react'
import { EventWhereInput } from 'gql/graphql'

// common
import FilterForm from 'common/components/FilterForm'

type Props = {
  title: React.ReactNode
  filters: EventWhereInput
  setFilters: React.Dispatch<React.SetStateAction<EventWhereInput>>
  modules: string[]
}

const EventListFilter: FC<Props> = ({ title, setFilters, filters, modules }) => {
  const [where, setWhere] = useState<EventWhereInput>(filters)

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhere((prev) => ({ ...prev, extrinsic: { signer: { id_eq: e.target.value } } }))
  }

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

export default EventListFilter
