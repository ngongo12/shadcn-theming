import {useRef} from 'react'
import type {Rect} from 'konva/lib/shapes/Rect'
import {KonvaNodeEvents} from 'react-konva'

import useProductDisplay from '../../context/useProductDisplay'
import {DisplayItem, RectCover, SegmentData} from '../model/model'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const useSegment = (data: SegmentData) => {
  const {setDisplayItems} = useProductDisplay()

  const shelfRef = useRef<Rect>(null)

  const onSegmentDrop: KonvaNodeEvents['onDragEnd'] = (e) => {
    const dragItem = e.target.getClientRect()
    const stage = e.target.getStage()
    const overItem: RectCover | undefined = stage?.getClientRect()
    console.log('>>>>>>>>', {overItem, dragItem})
    setDisplayItems((prev) =>
      prev?.map((item) =>
        e.target.attrs?.id === item.data.id
          ? ({
              ...item,
              data: {
                ...item.data,
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
    onSegmentDrop,
  }
}

export default useSegment
