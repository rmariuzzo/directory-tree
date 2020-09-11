import { ThemeProps } from "styled-components"

const colors = {
  black: '#0B1006',
  white: '#FEF8E3',
  green: '#5B9566',
  lightGreen: '#ABAC5A',
  darkGreen: '#4B4818',
  brown: '#6A1D17',
  gray: '#E0E1B2',
  darkPink: '#F39962',
  lightPink: '#FCCA99',
}

export const theme = {
  fontFamily: "'Nunito', sans-serif",
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 600,
  },
  colors,
}

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

type FunctionalTheme<T = Theme> = {
  [key in keyof T]: T[key] extends object
      ? FunctionalTheme<T[key]>
      : () => T[key]
}

const shortcut = (input: object): FunctionalTheme => {
  const traverse = (target: Record<any, any>, path: Array<string>): any => {
    if (path.length > 0) {
      const [key, ...remainingKeys] = path
      return traverse(target[key], remainingKeys)
    }
    return target
  }
  const functionify = (target: any, path: Array<string> = []) => {
    return Object.keys(target).reduce<Record<any, any>>((p, key) => {
      const fullPath = [...path, key]
      p[key] = typeof target[key] === 'object' ? functionify(target[key], fullPath) : (props: ThemeProps<Theme>) => traverse(props.theme, fullPath)
      return p
    }, {})
  }
  return functionify(input) as FunctionalTheme
}

export const fnt = shortcut(theme)
