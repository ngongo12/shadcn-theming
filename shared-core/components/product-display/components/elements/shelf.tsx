import React from 'react'
import {Group, Rect} from 'react-konva'

import useProductDisplay from '../../context/useProductDisplay'
import useDragging from '../hooks/useDragging'
import useShelf from '../hooks/useShelf'
import {ProductData} from '../model/model'
import {ShelfProps} from '../model/type'
import Product from './product'

const Shelf = ({data}: ShelfProps) => {
  const {x, y, width, height, maxMerch = 0} = data
  const {shelfRef, onShelfDrop} = useShelf(data)
  const {displayItems} = useProductDisplay()
  const {onDragEnd, onDragStart} = useDragging({
    dataItem: {
      type: 'shelf',
      data,
    },
    onDragEnd(e) {
      onShelfDrop(e)
    },
  })
  const products = displayItems
    ?.filter(
      (item) => item.type === 'product' && item.data.parentId === data.id,
    )
    ?.map((item) => item.data)

  const showMaxMerch = true
  return (
    <Group
      x={x}
      y={y}
      id={data.id}
      name="shelf"
      draggable
      onDragEnd={onDragEnd}
      customData={data}
      onDragStart={onDragStart}>
      <Rect
        x={0 + 0.5}
        y={0 + 0.5}
        id={data.id}
        name="shelf-merch"
        width={width - 1}
        height={showMaxMerch ? maxMerch : 0}
        stroke={showMaxMerch ? 'aqua' : undefined}
        strokeWidth={1}
        ref={shelfRef}
      />

      <Rect
        id={`${data.id}-shelf-base`}
        x={0}
        y={0 + maxMerch}
        width={width}
        height={height}
        fill="teal"
      />
      {products?.map((item, idx) => (
        <Product
          key={`${idx}-${item?.id}`}
          data={{...(item as ProductData)}}
          // data={item}
        />
      ))}
    </Group>
  )
}

export default Shelf
