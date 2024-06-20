import "@/shared-core/styles/globals.css"
import React from "react"
import { SiteHeader } from "@/shared-core/components/site-header"
import { TailwindIndicator } from "@/shared-core/components/tailwind-indicator"
import { ThemeProvider } from "@/shared-core/components/theme-provider"
import { fontSans } from "@/shared-core/lib/fonts"
import { cn } from "@/shared-core/lib/utils"

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default MainProvider
