import CookieBanner from 'common/components/CookieBanner'
import { FC, ReactNode, useEffect } from 'react'
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'

type Props = {
  children?: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search)
  }, [location])

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-[#F1F7F8] to-[#EFFDFF] dark:bg-dark font-['Montserrat'] relative">
      <div className="flex flex-col min-h-screen w-full bg-[url('/src/common/images/backgroundColor.svg')] bg-cover font-['Montserrat'] relative">
        {children}
        <div className='w-full sticky bottom-0'>
          <CookieBanner />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
