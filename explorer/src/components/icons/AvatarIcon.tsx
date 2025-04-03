import { FC } from 'react'

type Props = {
  width?: string
  height?: string
}

export const AvatarIcon: FC<Props> = ({ width = '90', height = '97' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='dark:text-white'
    >
      <g>
        <circle fill='#ABCFEF' cx='256' cy='120.889' r='120.889' />
        <path
          fill='#ABCFEF'
          d='M412.444,512c31.418,0,56.889-25.471,56.889-56.889c0-117.82-95.514-213.333-213.333-213.333
		S42.667,337.291,42.667,455.111c0,31.418,25.471,56.889,56.889,56.889H412.444z'
        />
      </g>
      <g>
        <polygon fill='#8DADFF' points='255.999,241.778 255.999,241.778 256,241.778 	' />
        <path
          fill='#8DADFF'
          d='M376.889,120.889C376.889,54.124,322.765,0,256,0h-0.001v241.778H256
		C322.765,241.778,376.889,187.654,376.889,120.889z'
        />
        <path
          fill='#8DADFF'
          d='M256,241.778L256,241.778L255.999,512h156.446c31.418,0,56.889-25.471,56.889-56.889
		C469.333,337.291,373.82,241.778,256,241.778z'
        />
      </g>
    </svg>
  )
}
