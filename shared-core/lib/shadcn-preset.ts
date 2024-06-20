import type {Config} from 'tailwindcss'
import { shadcnPlugin } from './shadcn-plugin'
import animatedPlugin from 'tailwindcss-animate'

export const shadcnPreset: Config = {
  content: [],
  plugins: [shadcnPlugin, animatedPlugin],
}