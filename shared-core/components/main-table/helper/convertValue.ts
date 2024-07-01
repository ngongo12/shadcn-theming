/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from 'dayjs'

import {FilterComponentType, FilterItemType} from '../../filter-component'

export const convertValueToFormValue = (
  inValue?: any,
  type?: FilterItemType | string,
) => {
  switch (type) {
    case FilterItemType.DATE: {
      if (!inValue) return
      if (typeof inValue === 'string') {
        const date = dayjs(inValue)
        return date.isValid() ? date : undefined
      }
      return inValue
    }
    case FilterItemType.RANGE_DATE: {
      if (!inValue) return inValue
      if (typeof inValue === 'string') {
        const arr = inValue.split(',')
        const start = dayjs(arr[0])
        const end = dayjs(arr[1])

        if (start.isValid() && end.isValid()) {
          return {
            from: start,
            to: end,
          }
        }
        return
      }
      return inValue
    }
    case FilterItemType.SWITCH: {
      if (inValue === 'true') {
        return true
      }
      if (inValue === 'false') {
        return false
      }
      return inValue
    }
    case FilterItemType.MULTI_SELECT: {
      if (!inValue) return
      if (typeof inValue === 'string') {
        return inValue?.split?.(',') ?? undefined
      }
      return inValue
    }
    default:
      return inValue
  }
}

export const convertValueFormToString = (
  inValue?: any,
  type?: FilterItemType | string,
) => {
  if (!inValue) {
    if (type === FilterItemType.SWITCH) {
      if (inValue !== null && typeof inValue !== 'undefined') {
        return inValue.toString?.() ?? inValue
      }
    }
    return inValue ?? undefined
  }

  switch (type) {
    case FilterItemType.DATE: {
      if (inValue) {
        return dayjs(inValue)?.toISOString()
      }
      return
    }
    case FilterItemType.RANGE_DATE: {
      if (inValue) {
        const start = inValue.from
        const end = inValue.to
        if (start && end) {
          return [dayjs(start).toISOString(), dayjs(end).toISOString()]
        }
      }
      return
    }
    default:
      return inValue
  }
}

export const convertValuesToPayload = (
  values: ValueType,
  options?: FilterComponentType[],
) => {
  const convertParams = Object.keys(values ?? {})?.reduce((pre, cur) => {
    const found = options?.find((item) => item.name === cur)
    return {
      ...pre,
      [`${cur}`]: convertValueFormToString(
        values?.[cur],
        found?.component?.type,
      ),
    }
  }, {})

  return convertParams
}

interface ValueType {
  [key: string]: any
}

export const rangeDateToString = (name: string, date?: string[]) => {
  const from = date?.[0]
  const to = date?.[1]
  if (from || to) {
    return {
      [`${name}`]: {
        from: dayjs(from).toISOString(),
        to: dayjs(to).toISOString(),
      },
    }
  }
  return {}
}
