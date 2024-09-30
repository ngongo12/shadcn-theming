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

  const [filters, setFilters] = useState<FilterOption>({
    filter: mrDefaultValueAndParam,
  })
  const timeoutRef = useRef<number>()

  const onSearch = (values: FieldValues) => {
    setFilters((prev) => ({
      ...(prev ?? {}),
      filter: convertValuesToPayload(values, options),
    }))
  }
  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      allowUrlParams && replaceURLParams(filters?.filter, moduleId, tableName)
    }, 10)

    onRefreshData()
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current)
    }
  }, [JSON.stringify(filters?.filter)])

  const onRefreshData = () => {
    const searchParams = convertFilterFn ? convertFilterFn(filters) : filters
    getListFn?.(searchParams)
  }
  useEffect(() => {
    Object.entries(mrDefaultValueAndParam ?? {}).map(([key, value]) => {
      console.log('>>>>>', key, value)
      form?.setValue(key, value)
    })
  }, [])

  const onPageChange = ({
    page,
    pagePerSize,
  }: {
    page?: number
    pagePerSize?: number
  }) => {
    console.log('>>>>>', page)
    if (page) {
      setFilters((prevState) => ({
        ...prevState,
        paging: {
          ...(prevState?.paging ?? {}),
          start: (page - 1) * (filters?.paging?.limit ?? 20),
        },
      }))
      return
    }
    if (pagePerSize) {
      setFilters((prevState) => ({
        ...prevState,
        paging: {
          ...(prevState?.paging ?? {}),
          start: 0,
          limit: pagePerSize,
        },
      }))
      return
    }
  }

  return {
    onSearch,
    filters,
    options,
    form,
    onRefreshData,
    onPageChange,
  }
}

type FilterOption = {
  filter?: {
    [key: string]: string | number | Date | boolean | undefined
  }
  paging?: {start?: number; limit?: number}
}

export default useTableFilter
