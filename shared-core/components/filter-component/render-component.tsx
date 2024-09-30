import React from 'react'

import {Input, InputProps} from '@/shared-core/components/ui/input'
import {Select} from '@/shared-core/components/ui/select'
import {Switch} from '@/shared-core/components/ui/switch'
import {DatePicker, RangeDatePicker} from '@/shared-core/components/date-picker'

import {ComponentProps, FilterItemType} from './type'

const RenderComponent = ({type, props}: ComponentProps) => {
  switch (type) {
    case FilterItemType.INPUT: {
      return <Input {...props} />
    }
    case FilterItemType.SWITCH: {
      return <Switch {...props} />
    }
    case FilterItemType.DATE: {
      return <DatePicker {...props} />
    }
    case FilterItemType.RANGE_DATE: {
      return <RangeDatePicker {...props} />
    }
    case FilterItemType.SELECT: {
      return <Select {...props} />
    }
  }
  return <Input {...(props as InputProps)} />
}

export default RenderComponent
