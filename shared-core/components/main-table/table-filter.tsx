import React, {useState} from 'react'
import {ChevronDown, ChevronUp} from 'lucide-react'
import {useForm} from 'react-hook-form'

import {Button} from '@/shared-core/components/ui/button'
import {Form} from '@/shared-core/components/ui/form'
import FilterComponent from '@/shared-core/components/filter-component/filter-component'

import useMaxCols from './hooks/useMaxCols'
import {listFilter} from './test/listFilter'

const options = listFilter
const TableFilter = () => {
  const [expanded, setExpanded] = useState(false)
  const form = useForm()
  const {maxCols} = useMaxCols()
  const expand = (options?.length ?? 0) > maxCols - 1
  function onSubmit(data: unknown) {
    console.log('>>>> data', data)
  }
  const onClear = () => {
    form.reset()
  }
  if (!options.length) return
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-wrap items-end gap-2">
          {listFilter.map((item, idx) => (
            <div
              className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-6px)] md:flex-[0_0_calc(33.33%-6px)] lg:flex-[0_0_calc(25%-8px)]"
              key={`${item.name}-${idx}`}
              style={{
                display:
                  idx + 1 > (maxCols - 1 || 1)
                    ? !expanded
                      ? 'none'
                      : undefined
                    : undefined,
              }}>
              <FilterComponent {...item} form={form} />
            </div>
          ))}
          <div className="flex w-full flex-1 justify-end gap-2">
            <Button onClick={onClear} variant="secondary">
              Clear
            </Button>
            <Button type="submit">Search</Button>
            {expand && (
              <Button onClick={() => setExpanded(!expanded)} variant="link">
                {expanded ? 'Hide' : 'Expend'}
                {!expanded ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronUp className="size-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default TableFilter
