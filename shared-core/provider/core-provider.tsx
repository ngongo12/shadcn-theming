import React from "react"
import { ThemeProvider } from "@/shared-core/components/theme-provider"

const CoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default CoreProvider
