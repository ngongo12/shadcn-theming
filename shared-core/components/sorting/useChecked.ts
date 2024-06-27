import {useContext} from 'react'

import {ColumnDefine} from '../main-table/column'
import getPath from './getPath'
import SortingFilterContext from './sorting-filter-context'

const useChecked = (key: string) => {
  const context = useContext(SortingFilterContext)
  const setSortingList = context.sortingListState[1]

  const onCheckedChange = (checked: boolean) => {
    setSortingList((data) => {
      const foundPath = checked ? getPath(data, key) : undefined
      return onChangeDataChecked(key, data, checked, undefined, foundPath)
    })
  }

  return {
    onCheckedChange,
  }
}

const onChangeDataChecked = (
  key: string,
  data: ColumnDefine[],
  checked: boolean,
  forceChecked?: boolean,
  foundPath?: string[],
): ColumnDefine[] => {
  return data.map((item: ColumnDefine) => {
    //child of item
    if (typeof forceChecked === 'boolean') {
      console.log('>>>>>> forceChecked', key, forceChecked, foundPath)

      return {
        ...item,
        hidden: !forceChecked,
        children: item.children
          ? onChangeDataChecked(
              key,
              item.children,
              forceChecked,
              forceChecked,
              foundPath,
            )
          : item.children,
      }
    }
    if (item.key === key) {
      return {
        ...item,
        hidden: !checked,
        children: item.children
          ? onChangeDataChecked(key, item.children, checked, checked, foundPath)
          : item.children,
      }
    }
    if (foundPath) {
      if (foundPath.includes(item.key)) {
        return {
          ...item,
          hidden: !checked,
          children: item.children
            ? onChangeDataChecked(
                key,
                item.children,
                checked,
                undefined,
                foundPath,
              )
            : item.children,
        }
      }
    }
    return {
      ...item,
      children: item.children
        ? onChangeDataChecked(key, item.children, checked, undefined, foundPath)
        : item.children,
    }
  })
}

export default useChecked
