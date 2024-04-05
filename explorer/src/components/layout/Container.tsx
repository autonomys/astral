import React, { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const Container: FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto mb-20 flex grow justify-center px-5 font-['Montserrat'] md:px-[25px] 2xl:px-0">
      {children}
    </div>
  )
}
