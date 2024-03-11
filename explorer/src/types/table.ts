export type Row<T> = {
  index: number
  original: T
}
export type Cell<T> = { row: Row<T> }
