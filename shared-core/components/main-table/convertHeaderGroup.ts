import {HeaderGroup} from '@tanstack/react-table'

const convertHeaderGroup = <T>(headers: HeaderGroup<T>[]): HeaderGroup<T>[] => {
  const groupHeaderKey: string[] = []
  return headers.map((headerGroup) => {
    const headers = headerGroup.headers.map((item) => {
      const arr = item.id.split('_')

      if (item.isPlaceholder) {
        groupHeaderKey.push(item.id.split('_').slice(-1)?.[0])
        return {
          ...item,
          isPlaceholder: false,
          rowSpan: arr.length - 1,
        }
      } else {
        const isPlaceholder = groupHeaderKey.some((keys) => arr.includes(keys))

        return {
          ...item,
          isPlaceholder,
        }
      }
    })

    return {
      ...headerGroup,
      headers,
    }
  })
}

export default convertHeaderGroup
