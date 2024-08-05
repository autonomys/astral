export const countTablePages = (totalCount: number, pageSize: number) =>
  Math.max(1, Math.floor(totalCount / pageSize)) + (totalCount % pageSize > 0 ? 1 : 0)
