/* eslint-disable camelcase */
import { FilterForm } from 'components/common/FilterForm'
import { ExtrinsicWhereInput } from 'gql/graphql'
import { FC, useState } from 'react'

type Props = {
  title: React.ReactNode
  filters: ExtrinsicWhereInput
  setFilters: React.Dispatch<React.SetStateAction<ExtrinsicWhereInput>>
  modules: string[]
}

export const ExtrinsicListFilter: FC<Props> = ({ title, setFilters, filters, modules }) => {
  const [where, setWhere] = useState<ExtrinsicWhereInput>(filters)

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhere((prev) => ({ ...prev, signer: { id_eq: e.target.value } }))
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
      account={where?.signer?.id_eq || ''}
    />
  )
}
