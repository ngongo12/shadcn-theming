import {useState} from 'react'
import type {KonvaNodeEvents} from 'react-konva'

import {DisplayItem} from '../model/model'

interface Props {
  onDragEnd?: KonvaNodeEvents['onDragEnd']
  onDragStart?: KonvaNodeEvents['onDragStart']
  dataItem?: DisplayItem
}
const useDragging = ({
  onDragEnd: _onDragEnd,
  onDragStart: _onDragStart,
}: // dataItem,
Props) => {
  // const {setDragItem} = useProductDisplay()
  const [isDrag, setIsDrag] = useState(false)
  const onDragStart: KonvaNodeEvents['onDragStart'] = (e) => {
    e.cancelBubble = true
    _onDragStart?.(e)
    setIsDrag(true)
    // setDragItem(dataItem)
  }

  const onDragEnd: KonvaNodeEvents['onDragEnd'] = (e) => {
    e.cancelBubble = true
    _onDragEnd?.(e)
    setIsDrag(false)
    // setDragItem(undefined)
  }
  return {
    onDragStart,
    onDragEnd,
    isDrag,
    setIsDrag,
  }
}

export default useDragging
