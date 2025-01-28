export type TimeFrame = '1H' | '1D' | '1M'

export interface TimeFrameSelectorProps {
  selected: TimeFrame
  onChange: (timeFrame: TimeFrame) => void
}

export function TimeFrameSelector({ selected, onChange }: TimeFrameSelectorProps) {
  const timeFrames: TimeFrame[] = ['1H', '1D', '1M']

  return (
    <div className='flex w-fit gap-1 rounded-lg bg-gray-100 p-1'>
      {timeFrames.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={`rounded-md px-3 py-1 text-sm transition-colors ${
            selected === tf
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  )
}
