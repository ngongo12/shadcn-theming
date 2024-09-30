import '@/shared-core/styles/globals.css'
import {Metadata, Viewport} from 'next'
import CoreProvider from '@/shared-core/provider/core-provider'

import {siteConfig} from '@/shared-core/config/site'
import {TailwindIndicator} from '@/shared-core/components/tailwind-indicator'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'white'},
    {media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <>
      <CoreProvider>
        <div className="relative flex min-h-screen flex-col">
          {/* <SiteHeader /> */}
          <div className="flex-1 overflow-x-hidden">{children}</div>
        </div>
        <TailwindIndicator />
      </CoreProvider>
    </>
  )
}

export const viewport: Viewport = {
  colorScheme: 'light',
themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}
