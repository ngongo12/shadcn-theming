import {MutableRefObject, createContext, useState} from 'react'

import {Coordinate, DisplayItem} from '../components/model/model'

export type ProductDisplayContextType = {
  displayItemState: ReturnType<typeof useState<DisplayItem[]>>
  dragItemState: ReturnType<typeof useState<DisplayItem>>
  startPositionRef: MutableRefObject<Coordinate | undefined>
  tempItemRef: MutableRefObject<DisplayItem | undefined>
}

export const ProductDisplayContext = createContext<ProductDisplayContextType>(
  {} as ProductDisplayContextType,
)
