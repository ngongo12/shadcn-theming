import './org-chart.scss'
import React, {forwardRef, useImperativeHandle} from 'react'
import {DndContext, DragOverlay} from '@dnd-kit/core'

import ChartNode from './chart-node'
import {OrgChartContext} from './context'
import useOrgChart from './hook/useOrgChart'

interface Base<T> {
  id: string
  children?: T[]
}
interface OrgChardProps<T extends Base<T>> {
  data: T
  renderItem: (item: T) => React.ReactNode
}

interface OrgChartRef<T> {
  data: T
}

const OrgChart = forwardRef(
  <T extends Base<T>>(
    {data: _data, renderItem}: OrgChardProps<T>,
    ref: React.Ref<OrgChartRef<T>>,
  ) => {
    const useOrgChartContext = useOrgChart<T>({
      data: _data,
    })
    useImperativeHandle(ref, () => ({
      data,
    }))
    const {sensors, onDragMove, onDragStart, onDragEnd, dragItem, data} =
      useOrgChartContext

    return (
      <div className="org-chart-container">
        <OrgChartContext.Provider value={{useOrgChartContext, renderItem}}>
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}>
            <div className="overflow-auto">
              <ChartNode item={data} />
            </div>
            <DragOverlay>
              <div className="chart-item hide-relationship">
                {dragItem && <ChartNode item={dragItem} />}
              </div>
            </DragOverlay>
          </DndContext>
        </OrgChartContext.Provider>
      </div>
    )
  },
)

export default OrgChart
