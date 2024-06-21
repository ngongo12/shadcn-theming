import React from 'react'

import {ThemeProvider} from '@/shared-core/components/theme-provider'

import {fontSans} from '../lib/fonts'
import {cn} from '../lib/utils'

const CoreProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default CoreProvider
