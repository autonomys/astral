// common
import { exportToExcel } from 'common/helpers/exportToExcel'

type Props<T extends object> = {
  data: T[]
  filename: string
}

const ExportButton = <T extends object>({ data, filename }: Props<T>) => {
  const handleClick = () => {
    exportToExcel(data, `${filename}.xlsx`)
  }

  return (
    <button
      className='w-full max-w-fit flex p-2 sm:p-3 gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full bg-[#241235] text-white font-medium dark:bg-[#1E254E]'
      onClick={handleClick}
    >
      <span className='block'>Download page data</span>
    </button>
  )
}

export default ExportButton
