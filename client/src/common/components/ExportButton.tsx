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
      className='w-full max-w-fit flex space-x-4 rounded-full bg-[#241235] text-white px-4 py-[10px] font-medium'
      onClick={handleClick}
    >
      <span>Download page data</span>
      <ArrowLongRightIcon stroke='#DE67E4' className='w-6 h-6' />
    </button>
  )
}

export default ExportButton
