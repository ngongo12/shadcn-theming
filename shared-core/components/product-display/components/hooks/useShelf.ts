import {useRef} from 'react'
import type {Rect} from 'konva/lib/shapes/Rect'
import {KonvaNodeEvents} from 'react-konva'

import useProductDisplay from '../../context/useProductDisplay'
import checkCollision from '../../helper/checkCollision'
import {DisplayItem, RectCover, ShelfData} from '../model/model'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const useShelf = (data: ShelfData) => {
  const {setDisplayItems} = useProductDisplay()

  const shelfRef = useRef<Rect>(null)

  const onShelfDrop: KonvaNodeEvents['onDragEnd'] = (e) => {
    const segments = e.target.getStage()?.find('.segment-container')
    const stage = e.target.getStage()
    let overItem: RectCover | undefined = stage?.getClientRect()
    let parentId: string | undefined
    const dragItem = e.target.getClientRect()
    const dragItemBase = stage
      ?.findOne(`#${e.target.getAttr('id')}-shelf-base`)
      ?.getClientRect()
    if (!dragItemBase) return
    segments?.map((item) => {
      const targetItem = item.getClientRect()
      const isOver = checkCollision(dragItemBase, targetItem, false)
      if (isOver) {
        overItem = targetItem
        parentId = item.getAttr('id')
        console.log('>>>>>>>>, useShelf', targetItem)
      }
    })
    console.log(
      '>>>>>>',
      e.target.getAttr('id'),
      stage?.findOne(`#${e.target.getAttr('id')}-shelf-base`),
    )
    setDisplayItems((prev) =>
      prev?.map((item) =>
        e.target.attrs?.id === item.data.id
          ? ({
              ...item,
              data: {
                ...item.data,
                parentId,
                x: dragItem.x - (overItem?.x ?? 0),
                y: dragItem.y - (overItem?.y ?? 0),
              },
            } as DisplayItem)
          : item,
      ),
    )
  }

  return {
    shelfRef,
    onShelfDrop,
  }
}

export default useShelf
