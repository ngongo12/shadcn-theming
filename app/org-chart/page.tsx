'use client'

import React, {useRef} from 'react'

import OrgChart, {
  OrgChartRef,
} from '@/shared-core/components/org-chart/org-chart'

const Page = () => {
  const orgChartRef = useRef<OrgChartRef<any>>(null)
  const ds = {
    id: 'n1',
    name: 'Lao Lao',
    title: 'general manager',
    children: [
      {id: 'n2', name: 'Bo Miao', title: 'department manager'},
      {
        id: 'n3',
        name: 'Su Miao',
        title: 'department manager',
        children: [
          {id: 'n4', name: 'Tie Hua', title: 'senior engineer'},
          {
            id: 'n5',
            name: 'Hei Hei',
            title: 'senior engineer',
            children: [
              {id: 'n6', name: 'Dan Dan', title: 'engineer'},
              {id: 'n7', name: 'Xiang Xiang', title: 'engineer'},
            ],
          },
          {id: 'n8', name: 'Pang Pang', title: 'senior engineer'},
        ],
      },
      {id: 'n9', name: 'Hong Miao', title: 'department manager'},
      {
        id: 'n10',
        name: 'Chun Miao',
        title: 'department manager',
        children: [{id: 'n11', name: 'Yue Yue', title: 'senior engineer'}],
      },
    ],
  }
  return (
    <OrgChart
      data={ds}
      ref={orgChartRef}
      renderItem={(item: any, isEdit) =>
        isEdit ? (
          <div style={{display: 'flex'}}>
            <input autoFocus style={{width: 100}} />
            <button
              onClick={() => {
                orgChartRef.current?.onUpdateNode({name: 'New data'}, item.id)
              }}>
              S
            </button>
            <button
              onClick={() => {
                orgChartRef.current?.onDeleteNode(item.id)
              }}>
              C
            </button>
          </div>
        ) : (
          <div>{item.name}</div>
        )
      }
    />
  )
}

export default Page
