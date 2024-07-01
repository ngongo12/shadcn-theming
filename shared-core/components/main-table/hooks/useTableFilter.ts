import {useEffect, useState} from 'react'

import {FilterProps} from '../type'

const useTableFilter = ({options, convertFilterFn, getListFn}: FilterProps) => {
  const [filter, setFilter] = useState<FilterOption>()
  const onSearch = (values: FilterOption) => {
    setFilter(values)
  }
  useEffect(() => {
    const searchParams = convertFilterFn ? convertFilterFn(filter) : filter
    getListFn?.(searchParams)
    console.log('>>>>> effect', filter)
  }, [filter])

  return {
    onSearch,
    filter,
    options,
  }
}

type FilterOption = {
  [key: string]: string | number | Date | boolean | undefined
}

export default useTableFilter
