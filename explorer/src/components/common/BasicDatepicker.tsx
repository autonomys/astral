import { CalendarIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { FC, useEffect, useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'
import { IOptions } from 'tailwind-datepicker-react/types/Options'

dayjs.extend(utc)

type Props = {
  value?: string | undefined
  onChange?: (selectedDate: Date) => void
  minDate?: Date
}

const defaultOptions = {
  theme: {
    background: 'bg-white dark:bg-blueAccent dark:text-white',
    disabledText: 'text-gray-500/75 dark:text-gray-400/75',
    input: 'py-3 w-full rounded-lg bg-white dark:bg-blueAccent dark:text-white',
  },
} as IOptions

export const BasicDatepicker: FC<Props> = ({ onChange, value, minDate }) => {
  const [show, setShow] = useState<boolean>(false)
  const [options, setOptions] = useState<IOptions>(defaultOptions)

  const handleClose = (state: boolean) => {
    setShow(state)
  }

  useEffect(() => {
    if (minDate) setOptions({ ...defaultOptions, minDate: new Date(minDate) })
  }, [minDate])

  return (
    <Datepicker options={options} onChange={onChange} show={show} setShow={handleClose}>
      <div className='relative'>
        <span className='absolute left-3 flex size-5 items-center py-[22px] text-grayDark dark:text-white'>
          <CalendarIcon />
        </span>
        <input
          type='text'
          placeholder='Select Date'
          value={value ? dayjs(value).utc().format('MMMM DD, YYYY') : ''}
          onFocus={() => setShow(!show)}
          className='w-full rounded-[42px] border-transparent bg-white px-10 py-3 text-sm focus:border-gray-500 focus:bg-white focus:ring-0 dark:bg-blueAccent dark:text-white'
          readOnly
        />
      </div>
    </Datepicker>
  )
}
