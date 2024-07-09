'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import useThemes from '@/shared-core/themes/useThemes'
import {ColumnDef} from '@tanstack/react-table'

import {siteConfig} from '@/shared-core/config/site'
import {Button, buttonVariants} from '@/shared-core/components/ui/button'
import {columnKey} from '@/shared-core/components/main-table/column'
import MainTable from '@/shared-core/components/main-table/main-table'
import {listFilter} from '@/shared-core/components/main-table/test/listFilter'
import {
  Person,
  makeData,
} from '@/shared-core/components/main-table/test/makeData'

export default function IndexPage() {
  const {handleSetTheme} = useThemes()
  const [data, setData] = useState<Person[]>([])
  useEffect(() => {
    setData(makeData(25))
    return () => {}
  }, [])
  const initColumns: ColumnDef<Person>[] = [
    {
      id: 'fullName',
      header: 'Full name',
      accessorFn: (row) => row,
      cell: (row) => {
        const value = row.getValue<Person>()
        return `${value.firstName} ${value.lastName}`
      },
    },
    {id: 'info', header: 'Info'},
    {id: 'moreInfo', header: 'More Info'},
    {
      id: 'firstName',
      header: 'First name',
      accessorFn: (row: Person) => row.firstName,
      cell: (row) => row.getValue(),
    },
    {
      id: 'lastName',
      header: 'lastName',
      accessorFn: (row: Person) => row.lastName,
      cell: (row) => row.getValue(),
    },
    {
      id: 'age',
      header: 'age',
      accessorFn: (row: Person) => row.age,
      cell: (row) => row.getValue(),
    },
    {
      id: 'visits',
      header: 'visits',
      accessorFn: (row: Person) => row.visits,
      cell: (row) => row.getValue(),
    },
    {
      id: 'status',
      header: 'status',
      meta: {className: 'text-center'},
      accessorFn: (row: Person) => row.status,
      cell: (row) => row.getValue(),
    },
    {
      id: 'progress',
      header: 'progress',
      accessorFn: (row: Person) => row,
      cell: (row) => (row.getValue() as Person)?.progress,
    },
  ]
  return (
    <section className="container grid items-center gap-6 overflow-x-hidden pb-8 pt-6 md:py-10">
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}>
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({variant: 'outline'})}>
          GitHub
        </Link>
        <Button className="animate-in zoom-in duration-200" variant="secondary">
          Secondary
        </Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost" onClick={() => handleSetTheme({}, 'test')}>
          Apply Theme
        </Button>
      </div>
      <section className="mt-8 w-full overflow-hidden">
        <MainTable
          data={data}
          initColumns={initColumns}
          columnKey={columnKey}
          enableRowSelection
          filterProps={{
            options: listFilter,
            allowUrlParams: true,
          }}
        />
      </section>
    </section>
  )
}
