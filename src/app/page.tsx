import { getProducts } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className='space-y-8'>
      <section className='text-center space-y-4'>
        <h1 className='text-4xl font-bold tracking-tight'>Welcome to Eroica</h1>
        <p className='text-xl text-muted-foreground'>
          Refined. Minimal. Elite.
        </p>
      </section>

      {products.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>No products yet.</p>
        </div>
      ) : (
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {products.map((product) => (
            <Card
              key={product.id}
              className='overflow-hidden hover:shadow-lg transition-shadow'
            >
              <Link href={`/product/${product.slug}`}>
                <div className='relative w-full h-64'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-lg font-semibold line-clamp-1'>
                      {product.name}
                    </CardTitle>
                    {product.category && (
                      <Badge variant='secondary' className='ml-2'>
                        {product.category}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-2xl font-bold'>
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </section>
      )}
    </div>
  )
}
