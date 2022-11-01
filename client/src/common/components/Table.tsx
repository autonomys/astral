import { FC, ReactElement, useMemo } from "react";
import { generateArrayOfNumbers } from "../helpers";

export type Column = {
  title: string;
  cells: ReactElement[];
  isNumeric?: boolean;
  centerTitle?: boolean;
};

type Props = {
  id: string;
  columns: Column[];
  footer?: ReactElement;
  emptyMessage: string;
  tableRowProps?: string;
  tableHeaderProps?: string;
  tableProps?: string;
};

const Table: FC<Props> = ({
  id,
  columns,
  emptyMessage,
  footer,
  tableHeaderProps,
  tableRowProps,
  tableProps,
}) => {
  const cellsCount = useMemo(() => columns?.[0]?.cells?.length ?? 0, [columns]);
  const rows = useMemo(
    () =>
      generateArrayOfNumbers(cellsCount)?.reduce<ReactElement[][]>(
        (acc, _, index) => {
          const row = columns.map((column) => column.cells[index]);

          return [...acc, row];
        },
        []
      ),
    [cellsCount, columns]
  );
  const hasRows = Boolean(rows.length);

  return (
    <div className="w-full">
      <div className="rounded my-6">
        <table
          className={`min-w-max w-full table-auto shadow-md ${tableProps}`}
        >
          {hasRows ? (
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                {columns?.map(
                  (
                    { title, isNumeric = false, centerTitle = false },
                    index
                  ) => (
                    <th
                      key={`table-header-${id}-${index}`}
                      className={`${tableHeaderProps}`}
                    >
                      {isNumeric ? (
                        <div className="py-3 px-6 text-right">{title}</div>
                      ) : centerTitle ? (
                        <div className="py-3 px-6 text-center">{title}</div>
                      ) : (
                        <div className="py-3 px-6 text-left">{title}</div>
                      )}
                    </th>
                  )
                )}
              </tr>
            </thead>
          ) : null}
          <tbody className="text-gray-600 text-sm font-light">
            {rows?.map((row, index) => (
              <tr
                key={`table-row-${id}-${index}`}
                className={`border-b border-gray-200 hover:bg-gray-100 ${tableRowProps}`}
              >
                {row.map((content, index) =>
                  index === 1 ? (
                    <td
                      key={`table-cell-${id}-${index}`}
                      className="py-3 px-6 text-left whitespace-nowrap"
                    >
                      {content}
                    </td>
                  ) : (
                    <td
                      key={`table-cell-${id}-${index}`}
                      className="py-3 px-6 text-left"
                    >
                      {content}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!hasRows ? (
          <div className="flex align-middle justify-center">
            <p className="text-gray-600 text-md font-medium">{emptyMessage}</p>
          </div>
        ) : null}
      </div>
      {hasRows && footer != null ? (
        <div className="flex justify-end">{footer}</div>
      ) : null}
    </div>
  );
};

export default Table;
