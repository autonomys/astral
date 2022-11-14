import { FC } from "react";

type Props = {
  children: React.ReactNode;
};
export const List: FC<Props> = ({ children }) => {
  return <ul className="divide-y divide-gray-200">{children}</ul>;
};

export const ListItem: FC<Props> = ({ children }) => {
  return <li className="py-3 sm:py-4">{children}</li>;
};

type StyledListItemProps = {
  title: string;
  children: React.ReactNode;
};

export const StyledListItem: FC<StyledListItemProps> = ({
  title,
  children,
}) => {
  return (
    <ListItem>
      <div className="flex space-x-4 justify-between">
        <div className="min-w-0">
          <p className="text-md font-light text-gray-900 truncate">{title}</p>
        </div>
        <div className="inline-flex text-base font-normal text-gray-600 items-end">
          {children}
        </div>
      </div>
    </ListItem>
  );
};
