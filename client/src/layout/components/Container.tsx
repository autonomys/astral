import React, { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-center container mx-auto font-['Montserrat'] z-0">
      {children}
    </div>
  );
};

export default Container;
