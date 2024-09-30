import React from 'react'

import Product from './elements/product'
import Segment from './elements/segment'
import Shelf from './elements/shelf'
import {DisplayItem as DisplayItemData} from './model/model'

const DisplayItem = ({data}: {data: DisplayItemData}) => {
  switch (data.type) {
    case 'segment':
      return <Segment data={data.data} />
    case 'product':
      return <Product data={data.data} />
    case 'shelf':
      return <Shelf data={data.data} />
    default:
      return null
  }
}

export default DisplayItem
