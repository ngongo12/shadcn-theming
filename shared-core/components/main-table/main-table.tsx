'use client'

import React, {
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {useForm} from 'react-hook-form'

import Pagination, {PaginationProps} from '../pagination'
import SortingFilter from '../sorting/sorting-filter'
import {Button} from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import convertHeaderGroup from './convertHeaderGroup'
import generateColumn from './generateColumn'
import useRowSelection from './hooks/useRowSelection'
import useTableFilter from './hooks/useTableFilter'
import TableFilter from './table-filter'
import {MainTableHandler, MainTableProps} from './type'

const MainTable = <T,>(
  {
    data,
    columnKey,
    initColumns,
    enableRowSelection,
    filterProps,
    tableName = 'main',
    moduleId = 0,
    tableHeader,
    multipleSelectActions,
  }: MainTableProps<T>,
  ref: Ref<MainTableHandler>,
) => {
  const form = useForm()
  const [columnKeyDef, setColumnKeyDef] = useState(columnKey)
  const {selectColumn, setRowSelection, rowSelection, selectedRowKey} =
    useRowSelection<T>(enableRowSelection)

  const columns: ColumnDef<T>[] = selectColumn.concat(
    generateColumn(columnKeyDef, initColumns),
  )

  const useFilter = useTableFilter({
    ...filterProps,
    tableName,
    moduleId,
    form,
  })
  const {filters, onPageChange, onRefreshData} = useFilter

  useImperativeHandle(ref, () => ({
    refreshList: onRefreshData,
    selectedRowId: selectedRowKey,
  }))

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
  const pagingOption: PaginationProps = {
    currentPage: (filters.paging?.start ?? 0) / (filters.paging?.limit ?? 20),
    currentPageSize: filters.paging?.limit ?? 20,
    onPageChange: onPageChange,
  }
  const rows = table.getRowModel().rows
  return (
    <div>
      <TableFilter {...filterProps} useFilter={useFilter} />
      <div className="flex justify-between p-2">
        <h5 className="m-0 font-bold">{tableHeader?.title}</h5>
        <div className="flex items-center">
          {tableHeader?.actionButtons}
          {tableHeader?.export && <Button>Export</Button>}
          <SortingFilter data={columnKeyDef} setData={setColumnKeyDef} />
        </div>
      </div>
      <Table className="relative rounded-sm">
        <TableHeader className="bg-secondary sticky top-0">
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
          {rows.length ? (
            rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b">
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
        <TableFooter
          className={`bg-secondary sticky bottom-0 ${
            selectedRowKey?.length ? '' : 'hidden'
          }`}>
          <TableRow>
            <TableCell colSpan={rows?.[0]?.getVisibleCells().length}>
              <div className="flex items-center justify-between">
                Đã chọn {Object.keys(rowSelection).length}
                <div>{multipleSelectActions}</div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Pagination {...pagingOption} total={200} />
    </div>
  )
}

const ExportMainTable = forwardRef(MainTable) as <T>(
  props: MainTableProps<T> & {ref?: Ref<MainTableHandler>},
) => ReturnType<typeof MainTable<T>>

export default ExportMainTable
