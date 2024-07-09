import React, {Fragment, useEffect, useState} from 'react'

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from '../ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {PaginationProps} from './type'

const Pagination = ({
  total = 0,
  currentPage,
  pagePerSize = [10, 20, 30, 50],
  currentPageSize = 20,
  onPageChange,
}: PaginationProps) => {
  const [pageSize, setPageSize] = useState(currentPageSize ?? pagePerSize?.[1])
  const [page, setPage] = useState(currentPage ?? 1)
  const onPageClick = (_page: number) => {
    setPage(_page)
    onPageChange?.({page: _page})
  }
  const onChangePerPage = (perPage: number) => {
    onPageChange?.({pagePerSize: perPage})
    setPageSize(perPage)
    setPage(1)
  }
  useEffect(() => {
    currentPage && setPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    currentPageSize && setPageSize(currentPageSize)
  }, [currentPageSize])

  const maxPage = Math.ceil(total / pageSize)
  const pageShow = getPageShow(page, maxPage)
  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageClick((currentPage ?? 1) - 1)}
          />
        </PaginationItem>
        {pageShow.map((p, idx) => {
          const prevPage = pageShow[idx - 1]
          const jump = prevPage && p - prevPage > 1
          return (
            <Fragment key={idx}>
              {jump && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  isActive={p === page}
                  onClick={() => onPageClick(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            </Fragment>
          )
        })}

        {page < maxPage && (
          <PaginationItem>
            <PaginationNext onClick={() => onPageClick(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
      <Select
        onValueChange={(value) => onChangePerPage(Number(value))}
        value={pageSize.toString()}>
        <SelectTrigger className="ml-1 w-fit pr-1.5">
          <SelectValue>{pageSize}/size</SelectValue>
        </SelectTrigger>
        <SelectContent position="popper">
          {pagePerSize.map((option, id: number) => (
            <SelectItem key={`${option}-${id}`} value={option.toString()}>
              {option}/size
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </UIPagination>
  )
}

const getPageShow = (page: number, max: number, len = 5) => {
  const pageShow = Array.from({length: len / 2})
    .reduce(
      (prev: number[], _, idx) => {
        return [page - idx - 1, ...prev, page + idx + 1]
      },
      [page],
    )
    .filter((e) => e < max)
  const start = pageShow.slice(0, 1)?.[0]
  const end = pageShow.slice(0, -1)?.[0]
  if (start > 1) {
    pageShow.splice(0, 0, 1)
  }
  if (end < max) {
    pageShow.push(max)
  }
  return pageShow.filter((e) => e > 0 && e <= max)
}

export default Pagination
