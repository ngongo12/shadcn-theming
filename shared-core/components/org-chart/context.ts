import {createContext, useContext} from 'react'

import useOrgChart from './hook/useOrgChart'

type IProps<T> = {
  useOrgChartContext: ReturnType<typeof useOrgChart>
  renderItem: (item: T) => React.ReactNode
}

export const OrgChartContext = createContext<IProps<any> | undefined>(undefined)

export const useOrgChartContext = () => {
  const context = useContext(OrgChartContext)

  if (!context)
    throw new Error('useOrgChartContext must be use in useOrgChartContext')

  return context.useOrgChartContext
}
