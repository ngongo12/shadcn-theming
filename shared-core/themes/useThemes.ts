// "use client"
<<<<<<< HEAD
import { applyTheme } from './theme.utils'
import { ITheme } from './theme.interface'

const useThemes = () => {
  const handleSetTheme = (values: ITheme, name: string) => {
    applyTheme(
      {
        "--primary": "0 100% 50%",
        "--primary-foreground": "0 0% 50%",
      }
    )
  }
  return {
    handleSetTheme
  }
}

export default useThemes
=======

import {ITheme} from './theme.interface'
import {applyTheme} from './theme.utils'

const useThemes = () => {
  const handleSetTheme = (values: ITheme, name: string) => {
    applyTheme({
      '--primary': '0 100% 50%',
      '--primary-foreground': '0 0% 50%',
    })
  }
  return {
    handleSetTheme,
  }
}

export default useThemes
>>>>>>> update-layout
