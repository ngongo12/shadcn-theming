import React, {CSSProperties} from 'react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {GearIcon, HamburgerMenuIcon} from '@radix-ui/react-icons'

import {ColumnDefine} from '../main-table/column'
import {Checkbox} from '../ui/checkbox'
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover'
import SortingFilterContext from './sorting-filter-context'
import useChecked from './useChecked'
import useSorting from './useSorting'

export const SortingFilter = ({
  data,
  setData,
}: {
  data: ColumnDefine[]
  setData: React.Dispatch<React.SetStateAction<ColumnDefine[]>>
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <GearIcon className="size-6" />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <SortingFilterContext.Provider
          value={{
            sortingListState: [data, setData],
          }}>
          <_SortingFilter data={data} isRoot />
        </SortingFilterContext.Provider>
      </PopoverContent>
    </Popover>
  )
}
export const _SortingFilter = ({
  data,
  isRoot,
}: {
  data: ColumnDefine[]
  isRoot?: boolean
}) => {
  const {handleDragEnd} = useSorting()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  )
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        items={data.map((e) => e.key)}
        strategy={verticalListSortingStrategy}>
        {data.map((item) => (
          <DraggableRow key={item.key} data={item} isRoot={isRoot} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

const DraggableRow = ({
  data,
  isRoot,
}: {
  data: ColumnDefine
  isRoot?: boolean
}) => {
  const {transform, transition, setNodeRef, isDragging, attributes, listeners} =
    useSortable({
      id: data.key,
    })
  const {onCheckedChange} = useChecked(data.key)

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }
  const indeterminate = data?.children
    ? data.children.filter((item) => !item.hidden).length
      ? data.children.filter((item) => !item.hidden).length <
        data.children.length
      : false
    : false

  return (
    <div
      ref={setNodeRef}
      style={style}
      key={data.key}
      className={`flex flex-col ${isRoot ? '' : 'pl-3'}`}
      {...attributes}>
      <div className="flex items-center gap-2 p-1">
        <HamburgerMenuIcon className="size-4" {...listeners} />
        <Checkbox
          onCheckedChange={onCheckedChange}
          checked={indeterminate ? 'indeterminate' : !data?.hidden}
        />
        <span className="text-base font-normal">{data.label}</span>
      </div>
      <div className={isDragging ? 'hidden' : ''}>
        {data.children && <_SortingFilter data={data.children} />}
      </div>
    </div>
  )
}

export default SortingFilter
