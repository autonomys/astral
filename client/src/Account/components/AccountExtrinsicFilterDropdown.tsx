/* eslint-disable camelcase */
import { Listbox, Transition } from '@headlessui/react'
import { CheckCircleIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { ExtrinsicWhereInput } from 'gql/graphql'
import { FC, Fragment, useEffect, useState } from 'react'

// common
import { EmptyCircleIcon } from 'common/icons'

type Action = {
  id: string
  name: string
}

const ACTIONS = [
  { id: 'Subspace.vote', name: 'Vote' },
  { id: 'Timestamp.set', name: 'Set' },
  { id: 'Domains.submit_bundle', name: 'Submit Bundle' },
  { id: 'Domains.nominate_operator', name: 'Nominate Operator' },
  { id: 'Domains.register_operator', name: 'Register Operator' },
]

type Props = {
  filters: ExtrinsicWhereInput
  setFilters: React.Dispatch<React.SetStateAction<ExtrinsicWhereInput>>
}

const AccountExtrinsicFilterDropdown: FC<Props> = ({ filters, setFilters }) => {
  const [selectedPeople, setSelectedPeople] = useState<Action[]>([])
  const [where, setWhere] = useState<ExtrinsicWhereInput>(filters)

  useEffect(() => {
    if (where?.name_in && where?.name_in?.length > 0) {
      const selected = ACTIONS.filter((action) => where.name_in?.includes(action.id))
      setSelectedPeople(selected)
    }
  }, [where?.name_in])

  const handleSelect = (person: Action[]) => {
    const uniqueArr = Object.values(
      person.reduce((acc, obj) => {
        acc[obj.id] = obj
        return acc
      }, {}),
    ) as Action[]

    setSelectedPeople([...uniqueArr])

    const actions = uniqueArr.map((person) => person.id)
    setWhere({ ...where, name_in: actions })
  }

  const handleFilter = () => {
    setFilters(where)
  }

  const clearFilters = () => {
    setSelectedPeople([])
    setWhere({})
    setFilters({})
  }

  return (
    <div className='relative z-10'>
      <Listbox value={selectedPeople} onChange={handleSelect} multiple>
        <Listbox.Button className='inline-flex w-full justify-center justify-items-end gap-x-1.5 rounded-md px-2 py-1 text-sm font-semibold bg-white dark:bg-[#241235] text-[#DE67E4] dark:text-white shadow-sm'>
          <div className='w-3 h-3'>
            <FunnelIcon />
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='absolute flex flex-col items-center px-1 py-3 rounded-[11px] shadow-sm bg-white dark:bg-[#241235] w-max'>
            <Listbox.Options className='py-3 rounded-[11px] shadow-sm bg-white dark:bg-[#241235] w-max'>
              {ACTIONS.map((person) => (
                <Listbox.Option
                  key={person.id}
                  value={person}
                  className='relative cursor-default select-none py-2 px-4 text-gray-900 dark:text-white'
                >
                  <div className='flex gap-3 justify-between'>
                    {person.name}
                    <div>
                      {selectedPeople.some((selectedPerson) =>
                        Object.values(selectedPerson).includes(person.id),
                      ) ? (
                        <CheckCircleIcon className='h-5 w-5 text-[#37D058]' />
                      ) : (
                        <div className='h-4 w-4 pt-[3px]'>
                          <EmptyCircleIcon />
                        </div>
                      )}
                    </div>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>

            <div className='flex gap-2'>
              <button
                className='w-20 py-2 bg-white dark:bg-[#1E254E] hover:bg-gray-200 text-gray-800 dark:text-white text-sm font-medium rounded-[20px]'
                onClick={handleFilter}
              >
                Filter
              </button>
              <button
                className='w-20 py-2 bg-white dark:bg-[#1E254E] hover:bg-gray-200 text-gray-800 dark:text-white text-sm font-medium rounded-[20px]'
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </Transition>
      </Listbox>
    </div>
  )
}

export default AccountExtrinsicFilterDropdown
