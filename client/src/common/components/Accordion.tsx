import { FC, useState } from "react";

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
  value?: string;
};

const Accordion: FC<Props> = ({ title, children, value = "" }) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div id="accordion-open" data-accordion="open">
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full pb-5 text-md font-light text-gray-900 truncate text-left"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
          onClick={() => setIsActive(!isActive)}
        >
          <span className="flex items-center">{title}</span>
          <div className="flex items-center">
            {value}
            <svg
              data-accordion-icon=""
              className={
                isActive
                  ? "w-6 h-6 shrink-0 ml-2 rotate-180"
                  : "w-6 h-6 shrink-0 ml-2"
              }
              fill="#DE67E4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </h2>
      {isActive && (
        <div
          id="accordion-open-body-1"
          aria-labelledby="accordion-open-heading-1"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
