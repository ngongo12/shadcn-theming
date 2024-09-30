import {SelectProps} from '@radix-ui/react-select'
import {useForm} from 'react-hook-form'

import {InputProps} from '@/shared-core/components/ui/input'
import {SwitchProps} from '@/shared-core/components/ui/switch'
import {
  DatePickerProps,
  RangeDatePickerProps,
} from '@/shared-core/components/date-picker'

export interface FilterComponentType {
  title?: string
  description?: string
  name?: string | string[]
  component: ComponentProps
  tooltip?: string
  tooltipIcon?: React.ReactNode
  form?: ReturnType<typeof useForm>
}

export enum FilterItemType {
  MULTI_SELECT = 'MULTI_SELECT',
  SELECT = 'SELECT',
  SWITCH = 'SWITCH_SLIDER',
  INPUT = 'INPUT',
  DATE = 'DATE',
  RANGE_DATE = 'RANGE_DATE',
  ASYNC_SELECT = 'ASYNC_SELECT',
}

export type ComponentProps =
  | {
      type: FilterItemType.INPUT | FilterItemType.ASYNC_SELECT
      props?: InputProps
    }
  | {
      type: FilterItemType.SWITCH
      props?: SwitchProps
    }
  | {
      type: FilterItemType.SELECT
      props?: SelectProps
    }
  | {
      type: FilterItemType.DATE
      props?: DatePickerProps
    }
  | {
      type: FilterItemType.RANGE_DATE
      props?: RangeDatePickerProps
    }
