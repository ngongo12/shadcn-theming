import {useEffect, useState} from 'react'

import useWindowSize from './use-window-resize'

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
}
type BreakPointKey = keyof typeof breakpoints
export type BreakPoints = {
  [key in BreakPointKey]: boolean
}

function useBreakpoint() {
  const {width} = useWindowSize()
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakPoints>()
  useEffect(() => {
    const mediaQueryLists = Object.entries(breakpoints).map(([key, query]) => ({
      key,
      mql: window.matchMedia(query),
    }))
    const getBreakpoint = () => {
      return mediaQueryLists.reduce((res: BreakPoints, cur) => {
        return {
          ...res,
          [cur.key]: cur.mql.matches,
        }
      }, {} as BreakPoints)
    }

    const updateBreakpoint = () => {
      setCurrentBreakpoint(getBreakpoint())
    }

    updateBreakpoint()
  }, [width])

  return currentBreakpoint
}

export default useBreakpoint
