import {ColumnDef} from '@tanstack/react-table'
import {FieldValues} from 'react-hook-form'

import {FilterComponentType} from '../filter-component'
import useTableFilter from './hooks/useTableFilter'

export interface MainTableProps<T> {
  data: T[]
  initColumns: ColumnDef<T>[]
  columnKey: ColumnDefine[]
  enableRowSelection?: boolean
  filterProps: FilterProps
}

export interface FilterProps {
  options?: FilterComponentType[]
  convertFilterFn?: (value?: FieldValues) => FieldValues | undefined
  getListFn?: (value?: FieldValues) => void
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
