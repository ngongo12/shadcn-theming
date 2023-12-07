"use client"
import Link from "next/link"
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'
import { siteConfig } from "@/config/site"
import { buttonVariants, Button } from "@/components/ui/button"
import useThemes from '@/themes/useThemes'

const resolvedConfig = resolveConfig(tailwindConfig)

export default function IndexPage() {
  const {handleSetTheme} = useThemes()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
        <Button className='animate-in zoom-in duration-200' variant='secondary'>Secondary</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='ghost'
          onClick={() => handleSetTheme({}, 'test')}
        >Apply Theme</Button>
      </div><pre className='mt-8'>
        {JSON.stringify(resolvedConfig.plugins, null, 2)}
      </pre>
    </section>
  )
}
