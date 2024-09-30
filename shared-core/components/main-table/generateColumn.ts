import {ColumnDef} from '@tanstack/react-table'

import {ColumnDefine} from './column'

/**
 *
 * @param columnKey list of key to render column
 * @param initColumns initial columns render in table
 * @returns defined columns list
 */
const generateColumn = <T>(
  columnKey: ColumnDefine[],
  initColumns: ColumnDef<T>[],
): ColumnDef<T>[] => {
  return columnKey
    .map((column) => {
      if (column.hidden) return

      if (!column.children) {
        return initColumns.find((col) => col.id === column.key)
      }
      if (column.children) {
        const found = initColumns.find((col) => col.id === column.key)
        if (found) {
          return {
            ...found,
            columns: generateColumn(column.children, initColumns),
          }
        }
        return null
      }
      return null
    })
    .filter((e) => !!e) as ColumnDef<T>[]
}

export default generateColumn
