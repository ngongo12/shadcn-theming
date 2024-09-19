import {useEffect, useState} from 'react'
import {
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {v4 as uuid} from 'uuid'

import findTreeContainer from '../helper/findTreeContainer'
import handleUpdateNode from '../helper/handeUpdateNode'
import handleAddNode from '../helper/handleAddNode'
import handleDeleteNode from '../helper/handleDeleteNode'
import wrapOrgData from '../helper/wrapOrgData'

interface Base<T> {
  id: string
  children?: T[]
}
const useOrgChart = <T extends Base<T>>({data: _data}: {data: T}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {activationConstraint: {distance: 1}}),

    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  )

  const [dragItem, setDragItem] = useState<T>()
  const [collapseList, setCollapseList] = useState<string[]>([])
  const [data, setData] = useState<T>(_data)
  const [editId, setEditId] = useState<string>()
  const [dragData, setDragData] = useState<{
    level?: number
    parentId?: string
  }>()
  useEffect(() => {
    setData(_data)
  }, [JSON.stringify(_data)])

  const onDragStart = (event: DragStartEvent) => {
    setDragItem(event.active.data.current?.item)
    setDragData({
      level: event.active.data.current?.level,
      parentId: event.active.data.current?.parentId,
    })
  }

  const onDragMove = () => {
    // console.log('>>>>>>', event)
  }

  const onDragEnd = (event: DragEndEvent) => {
    clearDragging()
    const {active, over} = event
    const activeId = active.id.toString()
    const overId = over?.id.toString()
    const container = findTreeContainer(data, activeId)
    const containerIncludeOver = !!container?.find((item) => item.id === overId)
    if (
      overId &&
      activeId.toString() !== overId?.toString() &&
      containerIncludeOver
    ) {
      setData((prev) =>
        prev
          ? {
              ...prev,
              children: prev.children
                ? wrapOrgData({
                    active: activeId,
                    over: overId,
                    listData: prev.children ?? [],
                  })
                : prev.children,
            }
          : prev,
      )
    }
  }

  const clearDragging = () => {
    setDragItem(undefined)
    setDragData(undefined)
  }

  const onAddNewNode = <T>(id: string, data?: T) => {
    const newId = uuid()
    const newData: any = data ?? {
      id: newId,
    }
    if (collapseList.includes(id)) {
      handleCollapse(id)
    }
    handleToggleEdit(newId)
    setData((prev) => handleAddNode(prev, newData, id))
  }

  const handleCollapse = (id: string) => {
    setCollapseList((prev) => {
      const collapse = prev.includes(id)
      if (collapse) {
        return prev.filter((item) => item !== id)
      } else return prev.concat([id])
    })
  }

  const handleToggleEdit = (id: string) => {
    setEditId(id)
  }

  const onUpdateNode = <T>(updateData: T, id?: string) => {
    if (id || editId) {
      setEditId(undefined)
      setData((prev) =>
        handleUpdateNode(prev, updateData as any, id ?? editId ?? ''),
      )
    }
  }

  const onDeleteNode = (id?: string) => {
    if (id) {
      if (id === editId) {
        setEditId(undefined)
      }
      setData((prev) => handleDeleteNode(prev, id))
    }
  }

  return {
    sensors,
    dragItem,
    onDragMove,
    onDragStart,
    onDragEnd,
    data,
    dragData,
    onAddNewNode,
    collapseList,
    handleCollapse,
    editId,
    handleToggleEdit,
    onUpdateNode,
    onDeleteNode,
  }
}

export default useOrgChart
