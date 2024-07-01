import {useEffect, useRef, useState} from 'react'
import {
  getQuery,
  getQueryInnerModule,
} from '@/shared-core/helpers/browserHelper'
import {replaceURLParams} from '@/shared-core/helpers/queryFilterHelper'
import {FieldValues} from 'react-hook-form'

import {
  convertValueToFormValue,
  convertValuesToPayload,
} from '../helper/convertValue'
import {FilterProps} from '../type'

const useTableFilter = ({
  options,
  convertFilterFn,
  getListFn,
  allowUrlParams,
  moduleId,
  tableName,
  defaultValue,
  form,
}: FilterProps) => {
  const [filters, setFilters] = useState<FilterOption>()
  const timeoutRef = useRef<number>()
  const query = allowUrlParams
    ? getQueryInnerModule(getQuery() ?? {}, moduleId, tableName)
    : {}
  const newFilter: FieldValues = Object.values(query).some((e) => !!e)
    ? query
    : defaultValue ?? {}

  const mrDefaultValueAndParam = Object.keys(newFilter)?.reduce((pre, cur) => {
    const found = options?.find((item) => item.name === cur)
    return {
      ...pre,
      [`${cur}`]: convertValueToFormValue(
        newFilter?.[cur],
        found?.component?.type,
      ),
    }
  }, {})

  const onSearch = (values: FieldValues) => {
    setFilters((prev) => ({
      ...(prev ?? {}),
      query: convertValuesToPayload(values, options),
    }))
  }
  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      allowUrlParams && replaceURLParams(filters?.query, moduleId, tableName)
    }, 10)

    onRefreshData()
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }
  }, [JSON.stringify(filters?.query)])

  const onRefreshData = () => {
    const searchParams = convertFilterFn ? convertFilterFn(filters) : filters
    getListFn?.(searchParams)
  }
  useEffect(() => {
    console.log('>>>>>', mrDefaultValueAndParam)

    form?.setValue('', mrDefaultValueAndParam)
  }, [])
  return {
    onSearch,
    filters,
    options,
  }
}

type FilterOption = {
  query?: {
    [key: string]: string | number | Date | boolean | undefined
  }
  filter?: {start?: number; limit?: number}
}

export default useTableFilter
