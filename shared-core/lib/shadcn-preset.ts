import type {Config} from 'tailwindcss'
import animatedPlugin from 'tailwindcss-animate'

import {shadcnPlugin} from './shadcn-plugin'

export const shadcnPreset: Config = {
  content: [],
  plugins: [shadcnPlugin, animatedPlugin],
}
