import { FC } from 'react'
import { Type } from 'typescript'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
// common
import { exportToExcel } from 'common/helpers/exportToExcel'

type Props = {
  data: Type[]
  filename: string
}

const ExportButton: FC<Props> = ({ data, filename }) => {
  const handleClick = () => {
    exportToExcel(data, `${filename}.xlsx`)
  }

  return (
    <button
      className='w-full max-w-fit flex gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white px-2 md:px-4 py-2 md:py-[10px] font-medium dark:bg-[#1E254E]'
      onClick={handleClick}
    >
      <span className='hidden md:block'>Download page data</span>
      <span className='block md:hidden'>Download</span>
      <ArrowLongRightIcon stroke='#DE67E4' className='w-3 h-3 md:w-6 md:h-6' />
    </button>
  )
}

export default ExportButton
