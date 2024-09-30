'use client'

import {forwardRef, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import {Calendar as CalendarIcon} from 'lucide-react'
import {DateRange} from 'react-day-picker'

import {cn} from '@/shared-core/lib/utils'
import {Button} from '@/shared-core/components/ui/button'
import {Calendar} from '@/shared-core/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared-core/components/ui/popover'

import {RangeDatePickerProps} from './type'

export const RangeDatePicker = forwardRef(
  (
    {
      value,
      format = 'DD/MM/YYYY',
      onChange,
      calenderProps = {},
    }: RangeDatePickerProps,
    _,
  ) => {
    const [date, setDate] = useState<DateRange | undefined>(value)

    useEffect(() => {
      setDate(value)
    }, [value])

    return (
      <div className={cn('grid gap-2')}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'w-full justify-start overflow-hidden whitespace-nowrap text-left font-normal',
                !date && 'text-muted-foreground',
              )}>
              <CalendarIcon className="mr-2 size-4 min-w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {dayjs(date.from).format(format)} -{' '}
                    {dayjs(date.to).format(format)}
                  </>
                ) : (
                  dayjs(date.to).format(format)
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={onChange ?? setDate}
              numberOfMonths={2}
              fromYear={calenderProps?.fromYear ?? 1990}
              toYear={calenderProps?.fromYear ?? dayjs().year()}
              captionLayout="dropdown-buttons"
              {...calenderProps}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)
