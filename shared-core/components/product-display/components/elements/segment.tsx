import React from 'react'
import {Group, Rect} from 'react-konva'

import useProductDisplay from '../../context/useProductDisplay'
import {SEGMENT_FOOTER_COLOR} from '../constant'
import useDragging from '../hooks/useDragging'
import useSegment from '../hooks/useSegment'
import {ShelfData} from '../model/model'
import {SegmentProps} from '../model/type'
import Shelf from './shelf'

const Segment = ({data}: SegmentProps) => {
  const {container, base, notches, x, y} = data
  const {onSegmentDrop} = useSegment(data)
  const {isDrag, onDragEnd, onDragStart} = useDragging({
    dataItem: {
      type: 'segment',
      data,
    },
    onDragEnd(evt) {
      onSegmentDrop(evt)
    },
  })
  const {displayItems} = useProductDisplay()
  const shelves = displayItems
    ?.filter((item) => item.type === 'shelf' && item.data.parentId === data.id)
    ?.map((item) => item.data)
  return (
    // <Portal selector=".top-layer" enabled={false}>
    <Group
      x={x}
      y={y}
      draggable
      id={data?.id}
      name="segment"
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      stroke={isDrag ? 'black' : undefined}>
      <Rect
        x={0}
        y={0}
        width={container.width}
        height={container.height}
        id={data?.id}
        name="segment-container"
        fill="pink"
      />
      {notches && (
        <>
          <Rect
            x={0}
            y={0}
            width={notches.width}
            height={container.height}
            fill="#fff"
            stroke="black"
            strokeWidth={1}
          />
          <Rect
            x={container.width - notches.width}
            y={0}
            width={notches.width}
            height={container.height}
            fill="#fff"
            stroke="black"
            strokeWidth={1}
          />
        </>
      )}

      <Rect
        x={0}
        y={0 + container.height}
        width={container.width}
        height={base.height}
        fill={SEGMENT_FOOTER_COLOR}
      />
      {shelves?.map((item, idx) => (
        <Shelf key={`${idx}-${item.id}`} data={{...item} as ShelfData} />
      ))}
    </Group>
    // </Portal>
  )
}

export default Segment
