import { FC, useState } from 'react'
// common
import { exportToExcel } from 'common/helpers/exportToExcel'

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

const LazyExportButton: FC<Props> = ({ query, filename }) => {
  const [state, setState] = useState<ButtonStates>('idle')

  const handleClick = () => {
    setState('loading')
    query()
      .then((data) => {
        exportToExcel(data, `${filename}.xlsx`)
        setState('idle')
      })
      .catch((e) => {
        console.error(e)
        setState('error')
        setTimeout(() => setState('idle'), 3000)
      })
  }

  const text = textByState[state]

  return (
    <button
      className='w-full p-2 max-w-fit flex gap-2 text-sm md:text-base items-center md:space-x-4 rounded-full border-2 border-[#241235] text-[#241235] px-2 py-2 font-medium dark:bg-[#1E254E] dark:text-white'
      onClick={handleClick}
    >
      <span className='hidden md:block'>{text}</span>
      <span className='flex md:hidden items-center justify-around gap-1'>{text}</span>
    </button>
  )
}

export default LazyExportButton
