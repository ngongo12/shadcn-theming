'use client'

import React, {useEffect, useRef, useState} from 'react'
import {Flex} from 'antd'
import {Layer, Stage, Text, useStrictMode} from 'react-konva'

import DisplayItem from './components/display-item'
import ListProduct from './components/list-product'
import {
  Coordinate,
  DisplayItem as DisplayItemData,
  RectCover,
} from './components/model/model'
import {ProductDisplayContext} from './context/product-display-context'
import {productData, segmentData, shelfData} from './fakeData'
import checkCollision from './helper/checkCollision'
import useMainStage from './hooks/useMainStage'

const ProductDisplay = () => {
  useStrictMode(true)
  const startPositionRef = useRef<Coordinate>()
  const tempItemRef = useRef<DisplayItemData>()
  const {scale, handleWheel, stageRef} = useMainStage()
  const [tempItem, setTempItem] = useState<any>()
  const [displayItems, setDisplayItems] = useState<DisplayItemData[]>([
    {
      type: 'segment',
      data: {...segmentData},
    },
    {type: 'shelf', data: shelfData},
    {type: 'product', data: productData},
  ])
  const dragItemState = useState<DisplayItemData>()
  useEffect(() => {
    console.log('>>>>>> change')
    setDisplayItems((prev) => prev)
  }, [scale])

  // const getAllCoordinates = () => {
  //   stageRef.current?.batchDraw()

  //   const stage = stageRef.current

  //   if (!stage) return

  //   const shapes = stage.find('Rect, Circle, Group') // Find all Rect and Circle nodes

  //   shapes.forEach((shape: any) => {
  //     const {x, y} = shape.position() // Get position
  //     const customData = shape.getAttr('customData') // Get custom data
  //     console.log('>>>>> Custom Data:', shape.getName())
  //     console.log(
  //       `Shape ID: ${shape.getId()} | Position: (${x}, ${y}) | Custom Data:`,
  //       customData,
  //       shape?.find?.('Rect'),
  //     )

  //     // Optionally, you can get the bounding box for more details
  //     const boundingBox = shape.getClientRect()
  //     console.log('Bounding Box:', {
  //       scale,
  //       x: boundingBox.x / scale,
  //       y: boundingBox.y / scale,
  //       width: boundingBox.width / scale,
  //       height: boundingBox.height / scale,
  //     })
  //   })
  // }

  // const resetState = () => {
  //   setScale(1)
  //   stageRef.current?.scale({x: 1, y: 1})
  //   stageRef.current?.batchDraw()
  //   stageRef.current?.position({x: 0, y: 0})
  // }
  console.log('>>>>>', displayItems, tempItem)
  return (
    <Flex
      className="w-full"
      vertical
      style={{position: 'relative'}}
      onDrag={(e) => {
        const dragOffset = startPositionRef.current
        const stage = stageRef.current?.getClientRect()
        // console.log('>>>>>>', e, tempItemRef.current)
        if (!e.clientX && !e.clientY) return
        setTempItem({
          type: 'product',
          data: {
            ...(tempItemRef.current?.data ?? {}),
            x: e.clientX - (dragOffset?.x ?? 0) - (stage?.x ?? 0),
            y: e.clientY - (dragOffset?.y ?? 0) - (stage?.y ?? 0),
            width: (e.target as any).clientWidth,
            height: (e.target as any).clientHeight,
            id: 'temp',
          },
        })
      }}
      onDragEnd={() => {
        const stage = stageRef.current
        const temp = stage?.findOne('#temp')?.getClientRect()
        const shelves = stage?.find('.shelf-merch')
        if (!temp) return
        let overItem: RectCover | undefined = stage?.getClientRect()
        let parentId: string | undefined
        const dragItem = temp
        shelves?.map((item) => {
          const targetItem = item.getClientRect()
          const isOver = dragItem ? checkCollision(dragItem, targetItem) : false
          if (isOver) {
            overItem = targetItem
            parentId = item.getAttr('id')
          }
        })
        setTempItem(undefined)

        if (!parentId) {
          return
        }

        if (tempItemRef.current) {
          setDisplayItems((prev) =>
            (prev ?? []).concat([
              {
                // ...tempItemRef.current,
                type: tempItemRef.current?.type,
                data: {
                  ...tempItemRef.current?.data,
                  parentId,
                  x: dragItem.x - (overItem?.x ?? 0),
                  y: dragItem.y - (overItem?.y ?? 0),
                },
              } as DisplayItemData,
            ]),
          )
        }
      }}>
      {/* <Button onClick={getAllCoordinates}>Get</Button>
      <Button onClick={resetState}>Reset</Button> */}
      <ProductDisplayContext.Provider
        value={{
          displayItemState: [
            displayItems,
            setDisplayItems as React.Dispatch<
              React.SetStateAction<DisplayItemData[] | undefined>
            >,
          ],
          dragItemState,
          tempItemRef,
          startPositionRef,
        }}>
        <Stage
          style={{background: '#fff'}}
          width={window.innerWidth}
          height={window.innerHeight}
          onWheel={handleWheel}
          ref={stageRef}
          scaleX={scale}
          scaleY={scale}
          draggable
          // onDragMove={(e) => {
          //   console.log('>>>>>>>', e)
          // }}
          onDragEnd={(e) => {
            const root = e.target.getClientRect()
            console.log('>>>>>>>>> dragStage')
            return
            setDisplayItems((prev) =>
              prev.map((item) => {
                return !item.data?.parentId
                  ? item
                  : ({
                      ...item,
                      data: {
                        ...item.data,
                        x: item.data.x + root.x,
                        y: item.data.y + root.y,
                      },
                    } as DisplayItemData)
              }),
            )
          }}>
          <Layer>
            <Text fontSize={13} text={'(0,0)'} x={0} y={0} />
            {displayItems.map((item, idx) => {
              return item.data.parentId ? null : (
                <DisplayItem key={`${idx}${item?.data.id}`} data={item} />
              )
            })}
          </Layer>
          {tempItem && (
            <Layer _useStrictMode={false}>
              <DisplayItem data={tempItem} />
            </Layer>
          )}
          <Layer name="top-layer" />
        </Stage>
        <ListProduct />
      </ProductDisplayContext.Provider>
    </Flex>
  )
}

export default ProductDisplay
