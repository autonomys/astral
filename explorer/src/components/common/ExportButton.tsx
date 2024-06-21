import { exportToExcel } from '@/utils/exportToExcel'
import { sendGAEvent } from '@next/third-parties/google'
import { useCallback } from 'react'

type Props<T extends object> = {
  data: T[]
  filename: string
}

export const ExportButton = <T extends object>({ data, filename }: Props<T>) => {
  const handleClick = useCallback(() => {
    try {
      exportToExcel(data, `${filename}.xlsx`)
      sendGAEvent('event', 'export_page_data', {
        value: `filename:${filename}`,
      })
    } catch (e) {
      sendGAEvent('event', 'error', { value: e })
    }
  }, [data, filename])

  return (
    <button
      className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker p-2 text-sm font-medium text-white dark:bg-blueAccent sm:p-3 md:space-x-4 md:text-base'
      onClick={handleClick}
    >
      <span className='block'>Download page data</span>
    </button>
  )
}
