import { FC } from 'react'
import ReactJson from 'react-json-view'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any
}

const theme = {
  base00: 'transparent',
  base01: 'transparent',
  base02: 'transparent',
  base03: 'inherit',
  base04: '#ddd',
  base05: 'inherit',
  base06: 'inherit',
  base07: 'inherit',
  base08: 'inherit',
  base09: 'inherit',
  base0A: 'inherit',
  base0B: 'inherit',
  base0C: 'inherit',
  base0D: 'inherit',
  base0E: 'inherit',
  base0F: 'inherit',
}

export const Arguments: FC<Props> = ({ args }) => {
  return (
    <div data-testid='testJsonDisplay' className='text-grayDark dark:text-white'>
      <ReactJson
        src={args || {}}
        iconStyle='circle'
        theme={theme}
        collapseStringsAfterLength={100}
        shouldCollapse={(field) => {
          return field.type === 'object' && Object.entries(field.src).length > 5 ? true : false
        }}
      />
    </div>
  )
}
