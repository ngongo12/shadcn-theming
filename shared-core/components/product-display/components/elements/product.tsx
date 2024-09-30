import React from 'react'
import {Group, Rect, Text} from 'react-konva'
import {Portal} from 'react-konva-utils'

import {productList} from '../../fakeData'
import useDragging from '../hooks/useDragging'
import useProduct from '../hooks/useProduct'
import {ProductProps} from '../model/type'

const Product = ({data}: ProductProps) => {
  const {x, y, width, height, productData} = data
  const {onProductDrop} = useProduct(data)
  const {isDrag, onDragEnd, onDragStart} = useDragging({
    dataItem: {
      type: 'product',
      data,
    },
    onDragEnd(evt) {
      onProductDrop(evt)
    },
  })
  const product = productList.find(
    (item) => item.productId === productData?.productId,
  )
  const facing = {
    horizontal: product?.size?.width ? width / product?.size?.width : 1,
    vertical: product?.size?.height ? height / product?.size?.height : 1,
  }
  return (
    <Portal selector=".top-layer" enabled={isDrag}>
      <Group
        x={x}
        y={y}
        draggable
        id={data.id}
        name="product"
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={product?.color ?? '#fff'}
        />
        {Array(facing.horizontal)
          .fill(0)
          .map((_, idx) => {
            return Array(facing.vertical)
              .fill(0)
              .map((_, idy) => {
                return (
                  <Rect
                    key={`${idx}-${idy}`}
                    x={idx * (product?.size?.width ?? 0) + 0.5}
                    y={idy * (product?.size?.height ?? 0) + 0.5}
                    width={(product?.size?.width ?? 1) - 1}
                    height={(product?.size?.height ?? 1) - 1}
                    stroke="gray"
                    fill={product?.color ?? '#fffs'}
                    strokeWidth={1}
                  />
                )
              })
          })}
        <Text
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#fff"
          fontSize={13}
          wrap="char"
          align="center"
          verticalAlign="middle"
          text={product?.name ?? productData?.productId}
        />
      </Group>
    </Portal>
  )
}

export default Product
