import React, { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return <div className="flex flex-col min-h-screen w-full">{children}</div>
}

export default MainLayout
