import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {CheckIcon, MinusIcon} from '@radix-ui/react-icons'

import {cn} from '@/shared-core/lib/utils'

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({className, ...props}, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `border-primary focus-visible:ring-ring 
      data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state='indeterminate']:bg-primary 
      data-[state='indeterminate']:text-primary-foreground 
      group peer relative size-4 shrink-0 
      rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1
      disabled:cursor-not-allowed disabled:opacity-50`,
      className,
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}>
      <CheckIcon className="hidden size-4 group-data-[state='checked']:block" />
      <MinusIcon className="hidden size-4 group-data-[state='indeterminate']:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export {Checkbox}
