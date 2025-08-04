import { getProductBySlug } from '@/lib/actions'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params // await params object

  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>

          <p className="text-2xl text-gray-800 font-semibold mt-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 mt-6 leading-relaxed">
            {product.description}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}