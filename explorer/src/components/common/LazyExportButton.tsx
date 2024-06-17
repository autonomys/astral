import { exportToExcel } from '@/utils/exportToExcel'
import { FC, useCallback, useState } from 'react'

type Props = {
  query: () => Promise<unknown[]>
  filename: string
}

type ButtonStates = 'idle' | 'loading' | 'error'

const textByState: Record<ButtonStates, string> = {
  idle: 'Download full board',
  loading: 'Loading...',
  error: 'Error',
}

export const LazyExportButton: FC<Props> = ({ query, filename }) => {
  const [state, setState] = useState<ButtonStates>('idle')

  const handleClick = useCallback(() => {
    setState('loading')
    query()
      .then((data) => {
        exportToExcel(data, `${filename}.xlsx`)
        setState('idle')
      })
      .catch((e) => {
        console.error('Error query for full board data', e)
        setState('error')
        setTimeout(() => setState('idle'), 3000)
      })
  }, [filename, query])

  const text = textByState[state]

  return (
    <button
      className='flex w-full max-w-fit items-center gap-2 rounded-full border-2 border-[#241235] p-2 text-sm font-medium text-[#241235] dark:bg-[#1E254E] dark:text-white md:space-x-4 md:text-base'
      onClick={handleClick}
    >
      <span className='hidden md:block'>{text}</span>
      <span className='flex items-center justify-around gap-1 md:hidden'>{text}</span>
    </button>
  )
}
