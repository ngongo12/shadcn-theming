'use client'

import React, {useMemo, useState} from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {useForm} from 'react-hook-form'

import Pagination from '../pagination'
import SortingFilter from '../sorting/sorting-filter'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import convertHeaderGroup from './convertHeaderGroup'
import generateColumn from './generateColumn'
import useRowSelection from './hooks/useRowSelection'
import useTableFilter from './hooks/useTableFilter'
import TableFilter from './table-filter'
import {MainTableProps} from './type'

const MainTable = <T,>({
  data,
  columnKey,
  initColumns,
  enableRowSelection,
  filterProps,
  tableName = 'main',
  moduleId = 0,
}: MainTableProps<T>) => {
  const form = useForm()
  const [columnKeyDef, setColumnKeyDef] = useState(columnKey)
  const {selectColumn, setRowSelection, rowSelection} =
    useRowSelection<T>(enableRowSelection)

  const columns: ColumnDef<T>[] = selectColumn.concat(
    generateColumn(columnKeyDef, initColumns),
  )

  const useFilter = useTableFilter({...filterProps, tableName, moduleId, form})

  const table = useReactTable({
    data,
    columns,
    state: {rowSelection},
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: setRowSelection,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  })

  const convertedHeader = useMemo(
    () => convertHeaderGroup(table.getHeaderGroups()),
    [table.getHeaderGroups()],
  )
  return (
    <div>
      <TableFilter {...filterProps} useFilter={useFilter} />
      <div className="flex justify-between p-2">
        <h5 className="m-0 font-bold">Table Name</h5>
        <SortingFilter data={columnKeyDef} setData={setColumnKeyDef} />
      </div>
      <Table className="rounded-sm">
        <TableHeader>
          {convertedHeader.map((headerGroup) => (
            <TableRow className="hover:bg-unset" key={headerGroup.id}>
              {headerGroup.headers?.map((header) => {
                return header.isPlaceholder ? null : (
                  <TableHead
                    className={`border p-2 text-center ${
                      (header?.column?.columnDef?.meta as any)?.className ?? ''
                    }`}
                    key={header.id}
                    colSpan={header.colSpan}
                    rowSpan={header.rowSpan || 1}
                    style={{
                      width: header.getSize(),
                    }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id} className="border-b">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`p-2 ${
                          (cell?.column?.columnDef?.meta as any)?.className ??
                          ''
                        }`}
                        style={{
                          width: cell.column.getSize(),
                        }}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination total={200} />
    </div>
  )
}

export default MainTable
