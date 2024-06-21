import themeBase from './theme.base'
import {ITheme} from './theme.interface'

export const applyTheme = (themeObject: ITheme): void => {
  if (!themeObject) return
  const root = document.documentElement

  Object.keys(themeObject).map((property) => {
    if (property === 'name') {
      return
    }
    root.style.setProperty(property, themeObject[property])

    console.log('>>>>>', property, themeObject[property])
  })
}

export const extendTheme = (
  newTheme: ITheme,
  extending = themeBase,
): ITheme => {
  return {...extending, ...newTheme}
}
