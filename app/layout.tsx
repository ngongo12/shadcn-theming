import "@/shared-core/styles/globals.css"
import { Metadata } from "next"
import { SiteHeader } from "@/shared-core/components/site-header"
import { TailwindIndicator } from "@/shared-core/components/tailwind-indicator"
import { ThemeProvider } from "@/shared-core/components/theme-provider"
import { fontSans } from "@/shared-core/lib/fonts"
import { cn } from "@/shared-core/lib/utils"
import CoreProvider from "@/shared-core/provider/core-provider"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <CoreProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </CoreProvider>
        </body>
      </html>
    </>
  )
}
