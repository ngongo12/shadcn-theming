'use client'

import {forwardRef, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import {Calendar as CalendarIcon} from 'lucide-react'

import {cn} from '@/shared-core/lib/utils'
import {Button} from '@/shared-core/components/ui/button'
import {Calendar} from '@/shared-core/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared-core/components/ui/popover'

import {DatePickerProps} from './type'

export const DatePicker = forwardRef(
  (
    {
      value,
      onChange,
      format = 'DD/MM/YYYY',
      calenderProps = {},
    }: DatePickerProps,
    _,
  ) => {
    const [date, setDate] = useState<Date | undefined>(value)
    useEffect(() => {
      setDate(value)
    }, [value])

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}>
            <CalendarIcon className="mr-2 size-4" />
            {date ? dayjs(date).format(format) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange ?? setDate}
            initialFocus
            fromYear={calenderProps?.fromYear ?? 1990}
            toYear={calenderProps?.fromYear ?? dayjs().year()}
            captionLayout="dropdown-buttons"
            {...calenderProps}
          />
        </PopoverContent>
      </Popover>
    )
  },
)
