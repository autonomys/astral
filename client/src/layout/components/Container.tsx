import React, { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center grow container font-['Montserrat'] mx-auto mb-20 px-5 md:px-[25px] 2xl:px-0">
      {children}
    </div>
  )
}

export default Container
