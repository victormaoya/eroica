import { getProductBySlug } from '@/lib/actions'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params // await params object

  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  return (
    <div className='container max-w-6xl mx-auto px-4 py-8'>
      <div className='mb-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <Card className='overflow-hidden'>
          <div className='relative w-full h-96 lg:h-[500px]'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover'
              sizes='(min-width: 1024px) 50vw, 100vw'
              priority
            />
          </div>
        </Card>

        <div className='space-y-6'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <h1 className='text-3xl font-bold'>{product.name}</h1>
              {product.category && (
                <Badge variant='secondary'>{product.category}</Badge>
              )}
            </div>
            <p className='text-3xl font-bold text-primary'>
              ${product.price.toFixed(2)}
            </p>
          </div>

          <Separator />

          <div className='space-y-4'>
            <h2 className='text-lg font-semibold'>Description</h2>
            <p className='text-muted-foreground leading-relaxed'>
              {product.description}
            </p>
          </div>

          <Separator />

          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              Stock: {product.stock} available
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
