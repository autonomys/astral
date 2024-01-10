import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-[#F1F7F8] to-[#EFFDFF] dark:bg-dark font-['Montserrat'] relative">
      <div className="flex flex-col min-h-screen w-full bg-[url('/src/common/images/backgroundColor.svg')] bg-cover font-['Montserrat'] relative">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
