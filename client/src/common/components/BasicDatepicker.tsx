import React, { FC, useState } from 'react'
import Datepicker from 'tailwind-datepicker-react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { CalendarIcon } from '@heroicons/react/24/outline'

dayjs.extend(utc)

type Props = {
  value?: string | undefined
  onChange?: (selectedDate: Date) => void
}

const options = {
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  theme: {
    background: 'bg-white dark:bg-[#1E254E] dark:text-white',
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: '',
    disabledText: 'text-gray-500/75 dark:text-gray-400/75',
    input: 'py-3 w-full rounded-[20px] bg-white dark:bg-[#1E254E] dark:text-white',
    inputIcon: '',
    selected: '',
  },
}

const BasicDatepicker: FC<Props> = ({ onChange, value }) => {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = (state: boolean) => {
    setShow(state)
  }

  return (
    <Datepicker options={options} onChange={onChange} show={show} setShow={handleClose}>
      <div className='relative'>
        <span className='absolute flex py-[22px] left-3 items-center h-5 w-5 text-[#282929] dark:text-white'>
          <CalendarIcon />
        </span>
        <input
          type='text'
          placeholder='Select Date'
          value={value ? dayjs(value).utc().format('MMMM DD, YYYY') : ''}
          onFocus={() => setShow(!show)}
          className='px-10 py-3 w-full rounded-[42px] bg-white dark:bg-[#1E254E] dark:text-white border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm'
          readOnly
        />
      </div>
    </Datepicker>
  )
}

export default BasicDatepicker
