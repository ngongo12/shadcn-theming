export interface Size {
  height: number
  width: number
  depth?: number
}
export interface BaseData {
  id: string
  parentId?: string
}
export interface Coordinate {
  x: number
  y: number
}

export interface RectCover extends Pick<Size, 'width' | 'height'>, Coordinate {}
export interface CoverItem extends RectCover {
  item: DisplayItem
}

export interface SegmentData extends Coordinate, BaseData {
  container: Size
  base: Pick<Size, 'height'>
  notches?: {
    width: number
    start: number
    spacing: number
  }
  shelves?: ShelfData[]
}

export interface ShelfData extends Coordinate, Size, BaseData {
  maxMerch?: number
  products?: ProductData[]
}

export interface ProductData extends Coordinate, Size, BaseData {
  productData?: {productId?: string; color?: string}
}

export interface Product {
  productId: string
  name?: string
  size?: Size
  color?: string
}

export type DisplayItem =
  | {
      type: 'segment'
      data: SegmentData
    }
  | {
      type: 'shelf'
      data: ShelfData
    }
  | {
      type: 'product'
      data: ProductData
    }

export enum DisplayItemType {
  segment = 'segment',
  shelf = 'shelf',
  product = 'product',
}
