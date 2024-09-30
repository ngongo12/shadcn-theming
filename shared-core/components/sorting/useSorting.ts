import {useContext} from 'react'
import {DragEndEvent} from '@dnd-kit/core'
import {arrayMove} from '@dnd-kit/sortable'

import {ColumnDefine} from '../main-table/column'
import SortingFilterContext from './sorting-filter-context'

const useSorting = () => {
  const context = useContext(SortingFilterContext)

  const [sortingList, setSortingList] = context.sortingListState
  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event

    if (active?.id && over?.id && active.id !== over.id) {
      setSortingList((data) => {
        return swapItems(active.id as string, over?.id as string, data)
      })
    }
  }

  return {
    handleDragEnd,
    sortingList,
  }
}
/**
 * 
 * @param activeId id of data want to move
 * @param overId id of destination
 * @param data list data
 * @returns data after swap between activeId and overId
 */
const swapItems = (
  activeId: string,
  overId: string,
  data: ColumnDefine[],
): ColumnDefine[] => {
  const index = data.findIndex((item) => item.key === activeId)
  if (index >= 0) {
    const newIndex = data.findIndex((col) => col.key === overId)

    return arrayMove(data, index, newIndex)
  } else {
    return data.map((item) => {
      if (item.children) {
        return {
          ...item,
          children: swapItems(activeId, overId, item.children),
        }
      }
      return item
    })
  }
}

export default useSorting
