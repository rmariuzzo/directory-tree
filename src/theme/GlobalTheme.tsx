import 'normalize.css'
import {createGlobalStyle} from 'styled-components'
import { fnt } from './theme'

export const GlobalTheme = createGlobalStyle`
  html {
    font-size: 16px;
  }
  
  body {
    color: ${fnt.colors.black};
    font-family: ${fnt.fontFamily};
    background-color: ${fnt.colors.gray};
    padding: 1rem;
  }

  * {
    box-sizing: border-box;
  }
`