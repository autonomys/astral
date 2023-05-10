/* eslint-disable camelcase */
import { FC, useState } from 'react'
import { ExtrinsicWhereInput } from 'gql/graphql'

// common
import FilterForm from 'common/components/FilterForm'

type Props = {
  title: React.ReactNode
  filters: ExtrinsicWhereInput
  setFilters: React.Dispatch<React.SetStateAction<ExtrinsicWhereInput>>
}

const ExtrinsicListFilter: FC<Props> = ({ title, setFilters, filters }) => {
  const [where, setWhere] = useState<ExtrinsicWhereInput>(filters)

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhere((prev) => ({ ...prev, signer: { id_eq: e.target.value } }))
  }

  return (
    <FilterForm
      title={title}
      where={where}
      filters={filters}
      setWhere={setWhere}
      setFilters={setFilters}
      handleAccountChange={handleAccountChange}
      account={where?.signer?.id_eq || ''}
    />
  )
}

export default ExtrinsicListFilter
