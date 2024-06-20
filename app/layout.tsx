import "@/shared-core/styles/globals.css"
import { Metadata } from "next"
import { SiteHeader } from "@/shared-core/components/site-header"
import { TailwindIndicator } from "@/shared-core/components/tailwind-indicator"
import { siteConfig } from "@/shared-core/config/site"
import MainProvider from "@/shared-core/provider/main-provider"

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
      <MainProvider>
        <div className="flex-1">{children}</div>
      </MainProvider>
    </>
  )
}
