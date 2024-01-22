import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FC, Fragment, useMemo } from 'react'
import { OperatorAction, OperatorActionType } from './ActionsModal'

interface ActionsDropdownProps {
  action: OperatorAction
  handleAction: (action: OperatorAction) => void
  row: {
    original: {
      id: string
      currentTotalStake: string
    }
  }
  excludeActions?: OperatorActionType[]
  nominatorMaxStake?: string
}

export const ActionsDropdown: FC<ActionsDropdownProps> = ({
  action,
  handleAction,
  row,
  excludeActions,
  nominatorMaxStake,
}) => {
  const actionsAvailable = useMemo(
    () =>
      Object.keys(OperatorActionType)
        .slice(1)
        .filter((type) => !excludeActions || !excludeActions.includes(OperatorActionType[type])),
    [excludeActions],
  )

  return (
    <Listbox
      value={action.type}
      onChange={(val) =>
        handleAction({
          type: val,
          operatorId: parseInt(row.original.id),
          maxAmount: nominatorMaxStake
            ? BigInt(nominatorMaxStake)
            : BigInt(row.original.currentTotalStake),
        })
      }
    >
      <div className='relative'>
        <Listbox.Button className='font-["Montserrat"] relative w-full cursor-default mt-4 rounded-full bg-[#DE67E4] text-white py-[10px] pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-gradient-to-r from-[#EA71F9] to-[#4D397A] dark:text-white'>
          <div className='flex items-center justify-center'>
            <span className='hidden sm:block ml-2 truncate w-5 text-sm md:w-full '>Actions</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='h-5 w-5 text-gray-400 ui-open:rotate-180 ui-open:transform dark:text-[#DE67E4]'
                aria-hidden='true'
              />
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 w-auto md:w-full overflow-auto rounded-xl bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-[#1E254E] dark:text-white'>
            {actionsAvailable.map((actionType, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 text-gray-900 md:pl-4 pr-4 dark:text-white ${
                    active && 'bg-gray-100 dark:bg-[#2A345E]'
                  }`
                }
                value={actionType}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'} ${
                      OperatorActionType[actionType] === OperatorActionType.Deregister &&
                      'text-red-500'
                    }`}
                  >
                    {OperatorActionType[actionType]}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
