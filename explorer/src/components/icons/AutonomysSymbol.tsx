import { FC } from 'react'

type AutonomysSymbolProps = {
  fill?: string
}

export const AutonomysSymbol: FC<AutonomysSymbolProps> = ({ fill = 'currentColor' }) => {
  return (
    <svg
      width='22'
      height='23'
      viewBox='0 0 139 137'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_62_5)'>
        <path
          d='M87.0098 0L136.38 86.39C138.09 80.35 139 73.97 139 67.38C139 35 116.92 7.78 87.0098 0Z'
          fill={fill}
        />
        <path
          d='M87.0098 0L136.38 86.39C138.09 80.35 139 73.97 139 67.38C139 35 116.92 7.78 87.0098 0Z'
          fill={fill}
        />
        <path
          d='M69.5001 137C89.0801 137 106.76 128.88 119.4 115.84H19.6001C32.2301 128.89 49.9201 137 69.5001 137Z'
          fill={fill}
        />
        <path
          d='M69.5001 137C89.0801 137 106.76 128.88 119.4 115.84H19.6001C32.2301 128.89 49.9201 137 69.5001 137Z'
          fill={fill}
        />
        <path
          d='M0 67.39C0 73.98 0.92 80.36 2.62 86.4L51.99 0C22.09 7.78 0 35 0 67.39Z'
          fill={fill}
        />
        <path
          d='M0 67.39C0 73.98 0.92 80.36 2.62 86.4L51.99 0C22.09 7.78 0 35 0 67.39Z'
          fill={fill}
        />
        <path d='M102.53 86.28L69.5 28.48L36.48 86.28H102.53Z' fill={fill} />
        <path d='M102.53 86.28L69.5 28.48L36.48 86.28H102.53Z' fill={fill} />
      </g>
      <defs>
        <clipPath id='clip0_62_5'>
          <rect width='139' height='137' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
