import {ColumnDefine} from '../main-table/column'

const getPath = (
  data: ColumnDefine[],
  key: string,
  path = [] as string[],
): string[] => {
  return data.reduce((pre: string[], cur) => {
    if (cur.key === key) {
      return [...path, key]
    }
    if (cur.children) {
      const foundPath = getPath(cur.children, key, [...path, cur.key])

      if (foundPath.length) return foundPath
    }
    return pre
  }, [])
}

export default getPath
