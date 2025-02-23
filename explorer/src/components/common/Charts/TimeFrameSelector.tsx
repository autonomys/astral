export type TimeFrame = '1D' | '1W' | '1M' // '1H'

export interface TimeFrameSelectorProps {
  selected: TimeFrame
  onChange: (timeFrame: TimeFrame) => void
}

export function TimeFrameSelector({ selected, onChange }: TimeFrameSelectorProps) {
  const timeFrames: TimeFrame[] = ['1D', '1W', '1M'] // '1H',

  return (
    <div className='flex w-fit gap-1 rounded-lg bg-gray-100 p-1 dark:bg-blueAccent'>
      {timeFrames.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={`rounded-md px-3 py-1 text-sm transition-colors ${
            selected === tf
              ? 'bg-white text-gray-900 shadow-sm dark:bg-blueDarkAccent dark:text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  )
}
