import {useContext} from 'react'

import {ProductDisplayContext} from './product-display-context'

const useProductDisplay = () => {
  const context = useContext(ProductDisplayContext)
  const {tempItemRef, startPositionRef, dragItemState, displayItemState} =
    context
  const [dragItem, setDragItem] = dragItemState
  const [displayItems, setDisplayItems] = displayItemState

  return {
    dragItem,
    setDragItem,
    displayItems,
    setDisplayItems,
    tempItemRef,
    startPositionRef,
  }
}

export default useProductDisplay
