import {arrayMove} from '@dnd-kit/sortable'

interface Base<T> {
  id: string
  children?: T[]
}
const wrapOrgData = <T extends Base<T>>({
  listData,
  over,
  active,
}: {
  listData: T[]
  active: string
  over: string
}): T[] => {
  const activeIndex = listData?.findIndex((e) => e.id.toString() === active)
  const overIndex = listData?.findIndex((e) => e.id.toString() === over)
  if (listData.find((item) => item.id === active)) {
    return arrayMove(listData, activeIndex, overIndex)
  }
  return listData.map((item) => ({
    ...item,
    children: item.children
      ? wrapOrgData({listData: item.children ?? [], active, over})
      : item.children,
  }))
}

export default wrapOrgData
