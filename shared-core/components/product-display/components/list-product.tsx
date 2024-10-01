import React, {useState} from 'react'
import {Card, Flex, Typography} from 'antd'
import {v4 as uuid} from 'uuid'

import useProductDisplay from '../context/useProductDisplay'
import {productList} from '../fakeData'
import {Product} from './model/model'

const ListProduct = () => {
  const {tempItemRef, startPositionRef} = useProductDisplay()
  const [_, setDraggingItem] = useState<Product>()
  return (
    <Card
      style={{
        width: 300,
        height: '90%',
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      hoverable>
      <Flex vertical>
        <Typography.Title level={5}>Sản phẩm</Typography.Title>
        <Flex vertical gap={10}>
          {productList.map((item) => (
            <Flex gap={8} align="center">
              <div
                style={{
                  width: item.size?.width,
                  height: item.size?.height,
                  background: item.color,
                  // opacity: draggingItem?.productId === item.productId ? 0 : 1,
                }}
                draggable
                onDragStart={(e) => {
                  console.log('>>>>>>', e)
                  const data = {
                    productData: item,
                    x: 0,
                    y: 0,
                    width: item.size?.width as number,
                    height: item.size?.height as number,
                    id: uuid(),
                  }
                  tempItemRef.current = {
                    type: 'product',
                    data,
                  }
                  setDraggingItem(item)
                  const rect = (e.target as any).getBoundingClientRect()
                  const offsetX = e.clientX - rect.left
                  const offsetY = e.clientY - rect.top

                  // Store the offset to use it during dragging
                  startPositionRef.current = {x: offsetX, y: offsetY}
                }}
                onDragEnd={() => {
                  setDraggingItem(undefined)
                }}
              />
              <Typography.Text>{item.name}</Typography.Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  )
}

export default ListProduct
