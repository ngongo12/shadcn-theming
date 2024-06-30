import {DateRange} from 'react-day-picker'

import {CalendarProps} from '@/shared-core/components/ui/calendar'

export interface DatePickerProps {
  value?: Date
  onChange?: (date?: Date) => void
  format?: string
  calenderProps?: Omit<CalendarProps, 'selected' | 'onSelected' | 'mode'>
}

export interface RangeDatePickerProps {
  value?: DateRange
  onChange?: (date?: DateRange) => void
  format?: string
  calenderProps?: Omit<CalendarProps, 'selected' | 'onSelected' | 'mode'>
}
