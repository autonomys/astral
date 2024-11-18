export const countTablePages = (totalCount: number, pageSize: number) =>
  Math.ceil(totalCount / pageSize)
