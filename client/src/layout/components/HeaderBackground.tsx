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
    <div className='w-full absolute'>
      <div
        className='w-full absolute -z-10 h-[472px] blur-[120px] mx-auto inset-x-0 left-1/2 -translate-x-1/2'
        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
      >
        <div className='rounded-full absolute inset-x-[40%] top-[-250px] bg-[#929EEA] w-12 lg:w-[510px] h-[510px] dark:bg-transparent' />
        <div className='rounded-full absolute right-[20%] top-[-340px] bg-[#91D3A0] w-12 lg:w-[510px] h-[510px] dark:bg-transparent' />
        <div className='rounded-full absolute left-[20%] top-[-340px] bg-[#ABCFEF] w-12 lg:w-[510px] h-[510px] dark:bg-transparent' />
      </div>
      {isListView && (
        <img
          className='hidden top-[-140px] md:left-[33%] lg:left-[49%] xl:left-[58.3%] 2xl:left-[59.7%] -z-10 md:block absolute dark:invisible'
          src={planet}
          alt='planet'
        />
      )}
    </div>
  )
}

export default HeaderBackground
