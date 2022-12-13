import React, { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center container font-['Montserrat'] z-0 mb-20 px-5 xl:px-0 mx-auto">
      {children}
    </div>
  )
}

export default Container
