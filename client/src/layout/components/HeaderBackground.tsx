import { FC } from 'react'
import { useLocation } from 'react-router-dom'

// common
import planet from 'common/images/img.png'

const HeaderBackground: FC = () => {
  const location = useLocation()
  const pathName = location.pathname

  const isListView =
    pathName === '/blocks' ||
    pathName === '/accounts' ||
    pathName === '/events' ||
    pathName === '/extrinsics'

  return (
    <div className='w-full absolute -z-10 top-36 '>
      <div
        className='w-full absolute -z-10 h-[472px] blur-[120px] mx-auto inset-x-0 left-1/2 -translate-x-1/2'
        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
      >
        <div className='rounded-full absolute inset-x-[40%] top-[-250px] bg-[#929EEA] w-12 lg:w-[510px] h-[510px] dark:bg-transparent' />
        <div className='rounded-full absolute right-[20%] top-[-340px] bg-[#91D3A0] w-12 lg:w-[510px] h-[510px] dark:bg-transparent' />
        <div className='rounded-full absolute left-[20%] top-[-340px] bg-[#ABCFEF] w-12 lg:w-[510px] h-[510px] dark:bg-transparent' />
      </div>
      {isListView && (
        <div className='w-full flex container mx-auto px-5 xl:px-0'>
          <div
            className='w-full hidden -z-10 md:flex h-96 bg-no-repeat bg-right'
            style={{ backgroundImage: `url(${planet})` }}
          />
        </div>
      )}
    </div>
  )
}

export default HeaderBackground
