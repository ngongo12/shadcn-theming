import {ColumnDef} from '@tanstack/react-table'
import {FieldValues, useForm} from 'react-hook-form'

import {FilterComponentType} from '../filter-component'
import useTableFilter from './hooks/useTableFilter'

export interface MainTableProps<T> {
  tableName?: string
  moduleId?: number
  data: T[],
  total?: number
  initColumns: ColumnDef<T>[]
  columnKey: ColumnDefine[]

  enableRowSelection?: boolean
  multipleSelectActions?: React.ReactNode
  getRowId?: (row: T) => string | number

  filterProps: Omit<FilterProps, 'form'>
  tableHeader?: TableHeader
}

export interface MainTableHandler {
  selectedRowId: (number | string)[] | null
  refreshList: () => void
}

export interface TableHeader {
  title?: string
  actionButtons: React.ReactNode
  export?: {
    query: string
  }
}

export interface FilterProps {
  options?: FilterComponentType[]
  convertFilterFn?: (value?: FieldValues) => FieldValues | undefined
  getListFn?: (value?: FieldValues) => void
  allowUrlParams?: boolean
  moduleId?: number
  tableName?: string
  defaultValue?: FieldValues
  form: ReturnType<typeof useForm>
}

export interface ColumnDefine {
  key: string
  label?: string
  hidden?: boolean
  children?: ColumnDefine[]
}

export interface TableFilterProps {
  useFilter?: ReturnType<typeof useTableFilter>
}
