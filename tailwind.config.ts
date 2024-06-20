import type { Config } from "tailwindcss"

import { shadcnPreset } from "./shared-core/lib/shadcn-preset"

const config: Config = {
  presets: [shadcnPreset],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "shared-core/**/*.{ts,tsx}",
  ],
}

export default config
