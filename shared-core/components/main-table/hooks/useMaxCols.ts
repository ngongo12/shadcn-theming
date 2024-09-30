import useBreakpoint, {BreakPoints} from '@/shared-core/hooks/use-break-point'

const useMaxCols = () => {
  const breakpoint = useBreakpoint()
  return {
    maxCols: getMaxCols(breakpoint),
    breakpoint,
  }
}
const getMaxCols = (bp?: BreakPoints) => {
  if (bp?.['2xl'] || bp?.xl) {
    return 4
  }
  if (bp?.lg) {
    return 4
  }
  if (bp?.md) {
    return 3
  }
  if (bp?.sm) {
    return 2
  }
  return 1
}
export default useMaxCols
