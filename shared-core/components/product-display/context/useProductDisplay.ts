import {useContext} from 'react'

import {ProductDisplayContext} from './product-display-context'

const useProductDisplay = () => {
  const context = useContext(ProductDisplayContext)
  const {tempItemRef, startPositionRef, displayItemState} = context
  const [displayItems, setDisplayItems] = displayItemState

  return {
    displayItems,
    setDisplayItems,
    tempItemRef,
    startPositionRef,
  }
}

export default useProductDisplay
