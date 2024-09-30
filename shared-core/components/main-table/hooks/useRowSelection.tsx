import React, {useState} from 'react'
import {ColumnDef} from '@tanstack/react-table'

import {Checkbox} from '@/shared-core/components/ui/checkbox'

const useRowSelection = <T,>(enableRowSelection?: boolean) => {
  const [rowSelection, setRowSelection] = useState({})

  const selectColumn: ColumnDef<T>[] = enableRowSelection
    ? [
        {
          id: 'select',
          header: ({table}) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          ),
          cell: ({row}) => (
            <div className="px-1">
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            </div>
          ),
          maxSize: 34,
          meta: {className: 'text-center'},
        },
      ]
    : []

  const selectedRowKey = rowSelection ? Object.keys(rowSelection) : null

  return {rowSelection, setRowSelection, selectColumn, selectedRowKey}
}

export default useRowSelection
