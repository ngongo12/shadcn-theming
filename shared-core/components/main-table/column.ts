/**
 * @key key to map with colum
 * @label label of column
 * @hidden when hidden = true column not show
 * @children child of column if have children it header is a group
 */
export interface ColumnDefine {
  key: string
  label?: string
  hidden?: boolean
  children?: ColumnDefine[]
}

export const columnKey: ColumnDefine[] = [
  {
    key: 'fullName',
    label: 'Full name',
    children: [
      {
        key: 'firstName',
        label: 'First Name',
      },
      {
        key: 'lastName',
        label: 'Last Name',
      },
    ],
  },
  {
    key: 'info',
    label: 'Info',
    children: [
      {key: 'age', label: 'Age'},
      {
        key: 'moreInfo',
        label: 'More Info',
        children: [
          {key: 'visits', label: 'Visits'},
          {key: 'status', label: 'Status'},
          {key: 'progress', label: 'Progress'},
        ],
      },
    ],
  },
]
