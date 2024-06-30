'use client'

import React, {useEffect, useState} from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import SortingFilter from '../sorting/sorting-filter'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {columnKey} from './column'
import convertHeaderGroup from './convertHeaderGroup'
import generateColumn from './generateColumn'
import TableFilter from './table-filter'
import {Person, makeData} from './test/makeData'

const MainTable = () => {
  const [data, setData] = React.useState<Person[]>([])
  const [columnKeyDef, setColumnKeyDef] = useState(columnKey)
  useEffect(() => {
    setData(() => makeData(20))
    return () => {}
  }, [])

  const initColumns: ColumnDef<Person>[] = [
    {
      id: 'fullName',
      header: 'Full name',
      accessorFn: (row) => row,
      cell: (row) => {
        const value = row.getValue<Person>()
        return `${value.firstName} ${value.lastName}`
      },
    },
    {id: 'info', header: 'Info'},
    {id: 'moreInfo', header: 'More Info'},
    {
      id: 'firstName',
      header: 'First name',
      accessorFn: (row: Person) => row.firstName,
      cell: (row) => row.getValue(),
    },
    {
      id: 'lastName',
      header: 'lastName',
      accessorFn: (row: Person) => row.lastName,
      cell: (row) => row.getValue(),
    },
    {
      id: 'age',
      header: 'age',
      accessorFn: (row: Person) => row.age,
      cell: (row) => row.getValue(),
    },
    {
      id: 'visits',
      header: 'visits',
      accessorFn: (row: Person) => row.visits,
      cell: (row) => row.getValue(),
    },
    {
      id: 'status',
      header: 'status',
      meta: {className: 'text-center'},
      accessorFn: (row: Person) => row.status,
      cell: (row) => row.getValue(),
    },
    {
      id: 'progress',
      header: 'progress',
      accessorFn: (row: Person) => row,
      cell: (row) => (row.getValue() as Person)?.progress,
    },
  ]

  const columns: ColumnDef<Person>[] = generateColumn(columnKeyDef, initColumns)

  const table = useReactTable({
    data,
    columns,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  })
  const convertedHeader = convertHeaderGroup(table.getHeaderGroups())
  return (
    <div>
      <TableFilter />
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
                    rowSpan={header.rowSpan || 1}>
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
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={`p-2 ${
                        (cell?.column?.columnDef?.meta as any)?.className ?? ''
                      }`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default MainTable
