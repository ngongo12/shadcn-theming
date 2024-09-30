export interface PaginationProps {
  total?: number
  currentPage?: number
  pagePerSize?: number[]
  currentPageSize?: number
  onPageChange?: (props: {page?: number; pagePerSize?: number}) => void
}
