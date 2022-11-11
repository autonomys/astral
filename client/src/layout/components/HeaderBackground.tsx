import { FC } from "react";

const HeaderBackground: FC = () => {
  return (
    <div
      className="w-full absolute z-0 h-[472px] blur-[120px] mx-auto inset-x-0 left-1/2 -translate-x-1/2"
      style={{ background: "rgba(255, 255, 255, 0.02)" }}
    >
      <div className="rounded-full absolute inset-x-[40%] top-[-250px] bg-[#929EEA] w-[510px] h-[510px]" />
      <div className="rounded-full absolute right-[20%] top-[-340px] bg-[#91D3A0] w-[510px] h-[510px]" />
      <div className="rounded-full absolute left-[20%] top-[-340px] bg-[#ABCFEF] w-[510px] h-[510px]" />
    </div>
  );
};

export default HeaderBackground;
