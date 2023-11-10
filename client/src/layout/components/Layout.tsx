import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-[url('/src/common/images/backgroundColor.svg')] flex flex-col min-h-screen w-full dark:bg-dark bg-cover font-['Montserrat'] relative">
      {children}
    </div>
  )
}

export default MainLayout
