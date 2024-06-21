import { shadcnPreset } from "@/shared-core/lib/shadcn-preset"
import type { Config } from "tailwindcss"

const config: Config = {
  presets: [shadcnPreset],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "**/*.{ts,tsx}"],
}

export default config
