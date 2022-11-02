import React, { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <div className="flex  min-h-screen justify-center container px-5 py-24 mx-auto">
      {children}
    </div>
  );
};

export default Container;
