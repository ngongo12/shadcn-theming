import {FilterComponentType, FilterItemType} from '../../filter-component'

export const listFilter: FilterComponentType[] = [
  {
    title: 'Input',
    name: 'input',
    component: {
      type: FilterItemType.INPUT,
    },
  },
  {
    title: 'Date',
    name: 'date',
    component: {
      type: FilterItemType.DATE,
    },
  },
  {
    title: 'Date picker',
    name: 'date-picker',
    component: {
      type: FilterItemType.RANGE_DATE,
    },
  },
]
