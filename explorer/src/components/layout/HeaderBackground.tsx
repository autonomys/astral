import { usePathname } from 'next/navigation'
import { FC } from 'react'

export const HeaderBackground: FC = () => {
  const pathname = usePathname()
  const planet = '/images/img.png'

  const isListView =
    pathname === '/blocks' ||
    pathname === '/accounts' ||
    pathname === '/events' ||
    pathname === '/extrinsics'

  return (
    <div className='absolute top-36 -z-10 w-full'>
      <div
        className='absolute inset-x-0 left-1/2 -z-10 mx-auto h-[472px] w-full -translate-x-1/2 blur-[120px]'
        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
      >
        <div className='absolute inset-x-[40%] top-[-250px] h-[510px] w-12 rounded-lg bg-pastelPurple dark:bg-transparent lg:w-[510px]' />
        <div className='absolute right-[20%] top-[-340px] h-[510px] w-12 rounded-lg bg-pastelGreen dark:bg-transparent lg:w-[510px]' />
        <div className='absolute left-[20%] top-[-340px] h-[510px] w-12 rounded-lg bg-pastelBlue dark:bg-transparent lg:w-[510px]' />
      </div>
      {isListView && (
        <div className='container mx-auto flex w-full px-5 xl:px-0'>
          <div
            className='-z-10 hidden h-96 w-full bg-right bg-no-repeat dark:hidden md:flex'
            style={{ backgroundImage: `url(${planet})` }}
          />
        </div>
      )}
    </div>
  )
}
