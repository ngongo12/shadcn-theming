import type {KonvaNodeEvents} from 'react-konva/ReactKonvaCore'

import useProductDisplay from '../../context/useProductDisplay'
import checkCollision from '../../helper/checkCollision'
import {DisplayItem, ProductData, RectCover} from '../model/model'

const useProduct = (data: ProductData) => {
  const {setDisplayItems} = useProductDisplay()

  const onProductDrop: KonvaNodeEvents['onDragEnd'] = (e) => {
    const stage = e.target.getStage()
    const shelves = stage?.find('.shelf-merch')
    let overItem: RectCover | undefined = stage?.getClientRect()
    let parentId: string | undefined
    const dragItem = e.target.getClientRect()
    shelves?.map((item) => {
      const targetItem = item.getClientRect()
      const isOver = checkCollision(dragItem, targetItem)
      if (isOver) {
        overItem = targetItem
        parentId = item.getAttr('id')
        console.log('>>>>>>>', targetItem)
      }
    })
    if (!parentId) {
      return
    }
    setDisplayItems((prev) =>
      prev?.map((item) => {
        return item.data.id === data.id
          ? ({
              ...item,
              data: {
                ...item.data,
                parentId,
                x: dragItem.x - (overItem?.x ?? 0),
                y: dragItem.y - (overItem?.y ?? 0),
              },
            } as DisplayItem)
          : item
      }),
    )
  }
  return {onProductDrop}
}

export default useProduct
