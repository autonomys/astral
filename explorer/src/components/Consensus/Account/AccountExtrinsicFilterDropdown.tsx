import { EmptyCircleIcon } from '@/components/icons/EmptyCircleIcon'
import { Listbox, Transition } from '@headlessui/react'
import { CheckCircleIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { ExtrinsicWhereInput } from 'gql/graphql'
import { FC, Fragment, useEffect, useState } from 'react'

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

export const AccountExtrinsicFilterDropdown: FC<Props> = ({ filters, setFilters }) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      person.reduce((acc: any, obj) => {
        acc[obj.id] = obj
        return acc
      }, {}),
    ) as Action[]

    setSelectedPeople([...uniqueArr])

    const actions = uniqueArr.map((person) => person.id)
    /* eslint-disable-next-line camelcase */
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
        <Listbox.Button className='inline-flex w-full justify-center justify-items-end gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-purpleAccent shadow-sm dark:bg-grayDarker dark:text-white'>
          <div className='size-3'>
            <FunnelIcon />
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='absolute flex w-max flex-col items-center rounded-[11px] bg-white px-1 py-3 shadow-sm dark:bg-grayDarker'>
            <Listbox.Options className='w-max rounded-[11px] bg-white py-3 shadow-sm dark:bg-grayDarker'>
              {ACTIONS.map((person) => (
                <Listbox.Option
                  key={person.id}
                  value={person}
                  className='relative cursor-default select-none px-4 py-2 text-gray-900 dark:text-white'
                >
                  <div className='flex justify-between gap-3'>
                    {person.name}
                    <div>
                      {selectedPeople.some((selectedPerson) =>
                        Object.values(selectedPerson).includes(person.id),
                      ) ? (
                        <CheckCircleIcon className='size-5 text-greenBright' />
                      ) : (
                        <div className='size-4 pt-[3px]'>
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
                className='w-20 rounded-[20px] bg-white py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-blueAccent dark:text-white'
                onClick={handleFilter}
              >
                Filter
              </button>
              <button
                className='w-20 rounded-[20px] bg-white py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-blueAccent dark:text-white'
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
