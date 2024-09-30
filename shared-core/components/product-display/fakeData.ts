import {
  Product,
  ProductData,
  SegmentData,
  ShelfData,
} from './components/model/model'

export const segmentData: SegmentData = {
  id: 'segment1',
  container: {width: 500, height: 500, depth: 400},
  base: {
    height: 50,
  },
  notches: {
    width: 5,
    start: 0,
    spacing: 50,
  },
  x: 50,
  y: 200,
}

export const shelfData: ShelfData = {
  id: 'shelf1',
  width: 400,
  height: 10,
  depth: 200,
  maxMerch: 100,
  x: 50,
  y: 200,
}

export const productData: ProductData = {
  id: 'product1',
  width: 60,
  height: 50,
  depth: 50,
  x: 50,
  y: 50,
  productData: {
    productId: '1',
  },
}

export const productList: Product[] = [
  {
    productId: '1',
    name: 'Pepsi',
    size: {height: 50, width: 20, depth: 20},
    color: 'blue',
  },
  {
    productId: '2',
    name: 'Beer Sai gon',
    size: {height: 50, width: 20, depth: 20},
    color: 'lime',
  },
  {
    productId: '3',
    name: 'Cocacola',
    size: {height: 50, width: 20, depth: 20},
    color: 'fuchsia',
  },
  {
    productId: '4',
    name: 'String',
    size: {height: 50, width: 20, depth: 20},
    color: 'aquamarine',
  },
]
