import { getProducts } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main className="px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome to Eroica</h1>
        <p className="mt-2 text-gray-600">Refined. Minimal. Elite.</p>
      </section>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products yet.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-xl font-bold text-gray-800 mt-2">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  )
}
