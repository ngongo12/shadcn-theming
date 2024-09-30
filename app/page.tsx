'use client'

import dynamic from 'next/dynamic'

const ProductDisplay = dynamic(
  () => import('@/shared-core/components/product-display'),
  {ssr: false},
)
export default function IndexPage() {
  return <ProductDisplay />
}
