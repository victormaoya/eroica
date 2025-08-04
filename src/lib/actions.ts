import { db } from '@/lib/db'

export async function getProducts() {
  return await db.product.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function getProductBySlug(slug: string) {
  return await db.product.findUnique({
    where: { slug }
  })
}