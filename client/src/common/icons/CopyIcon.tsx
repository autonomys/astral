import { FC } from 'react'

type Props = {
  fill?: string
  onClick?: () => void
}

const CopyIcon: FC<Props> = ({ fill = 'black', onClick }) => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M56.5631 47.1935C56.5631 52.3682 52.3682 56.5631 47.1935 56.5631H23.7695C18.5948 56.5631 14.3999 52.3682 14.3999 47.1935V23.7695C14.3999 18.5948 18.5948 14.3999 23.7695 14.3999H47.1935C52.3682 14.3999 56.5631 18.5948 56.5631 23.7695V47.1935Z'
        stroke={fill}
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M32.8066 65.5999H56.2306C61.4054 65.5999 65.6002 61.4047 65.6002 56.2303V32.8062'
        stroke={fill}
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default CopyIcon
