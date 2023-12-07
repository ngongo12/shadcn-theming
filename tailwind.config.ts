import type {Config} from 'tailwindcss'
import { shadcnPreset } from './lib/shadcn-preset'

const config: Config = {
  presets: [shadcnPreset],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
}

export default config