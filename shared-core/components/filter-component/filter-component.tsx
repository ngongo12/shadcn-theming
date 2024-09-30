import React from 'react'

import {FormControl, FormField, FormItem, FormLabel} from '../ui/form'
import RenderComponent from './render-component'
import {ComponentProps, FilterComponentType} from './type'

const FilterComponent = ({
  title,
  component: {type, props},
  form,
  name,
}: FilterComponentType) => {
  if (form)
    return (
      <FormField
        control={form.control}
        name={name as string}
        render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <RenderComponent
                {...({
                  type,
                  props: {
                    ...props,
                    ...field,
                  },
                } as ComponentProps)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    )
  return null
}

export default FilterComponent
