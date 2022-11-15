import { FC } from "react";
import { useLocation } from "react-router-dom";

// common
import planet from "common/images/img.png";

const HeaderBackground: FC = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const isListView =
    pathName === "/blocks" ||
    pathName === "/accounts" ||
    pathName === "/events" ||
    pathName === "/extrinsics";

  return (
    <div className="w-full absolute">
      <div
        className="w-full absolute -z-10 h-[472px] blur-[120px] mx-auto inset-x-0 left-1/2 -translate-x-1/2"
        style={{ background: "rgba(255, 255, 255, 0.02)" }}
      >
        <div className="rounded-full absolute inset-x-[40%] top-[-250px] bg-[#929EEA] w-[510px] h-[510px]" />
        <div className="rounded-full absolute right-[20%] top-[-340px] bg-[#91D3A0] w-[510px] h-[510px]" />
        <div className="rounded-full absolute left-[20%] top-[-340px] bg-[#ABCFEF] w-[510px] h-[510px]" />
      </div>
      {isListView && (
        <img
          className="w-full max-w-[650px] top-[-150px] -z-10 absolute left-3/4"
          src={planet}
          alt="planet"
        />
      )}
    </div>
  );
};

export default HeaderBackground;
