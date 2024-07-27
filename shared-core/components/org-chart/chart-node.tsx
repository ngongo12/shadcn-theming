import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import './chart-node.scss'
import React, {CSSProperties, useContext} from 'react'
import {CSS} from '@dnd-kit/utilities'

import {OrgChartContext, useOrgChartContext} from './context'

interface Base<T> {
  id: string
  children?: T[]
}
interface ChartNodeProps<T> {
  item: T
  level?: number
  parentId?: string
  hidePath?: boolean
}
const ChartNode = <T extends Base<T>>({
  item,
  level = 1,
  parentId,
  hidePath,
}: ChartNodeProps<T>) => {
  const {dragData, onAddNewNode} = useOrgChartContext()
  const context = useContext(OrgChartContext)
  const {renderItem} = context ?? {}
  const {transform, transition, setNodeRef, isDragging, attributes, listeners} =
    useSortable({
      id: item.id,
      data: {item, level, parentId},
    })
  const isDragContainer = dragData?.parentId === item?.id

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }
  const childIsLeaf = checkChildLeft(item.children)
  return (
    <div
      className={`chart-tree ${level === 1 ? 'root' : ''} ${
        hidePath ? 'hide-path' : ''
      } ${childIsLeaf ? 'last-branch' : ''}`}
      ref={setNodeRef}
      style={{...style}}
      {...listeners}
      {...attributes}
      key={item.id}>
      <div className={`chart-item ${item.children ? '' : 'not-child'} `}>
        {renderItem?.(item)}
        <div className="button-add" onClick={() => onAddNewNode(item.id)}>
          Add
        </div>
      </div>
      <div
        className={`chart-children ${isDragContainer ? 'show-path' : ''} ${
          childIsLeaf ? 'leaf' : ''
        } ${item.children?.length === 1 ? 'only' : ''}`}>
        <SortableContext
          items={(item?.children ?? []).map?.((e) => e.id?.toString())}
          strategy={
            childIsLeaf
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }>
          {item.children?.map((child) => (
            <ChartNode
              item={child}
              level={level + 1}
              parentId={item?.id}
              hidePath={isDragContainer}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

const checkChildLeft = (list?: any[]) => {
  if (!list) {
    return false
  }
  for (const item of list) {
    if (item.children?.length) {
      return false
    }
  }
  return true
}

export default ChartNode
