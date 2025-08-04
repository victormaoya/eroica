import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export async function main() {
  await db.product.deleteMany()

  await db.product.createMany({
    data: [
      {
        name: 'Eroica Leather Messenger Bag',
        slug: 'eroica-leather-messenger-bag',
        description: 'Premium leather messenger bag designed for everyday carry.',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1654773215728-4387196bc2a8?q=80&w=698&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Bags',
        stock: 20
      },
      {
        name: 'Eroica Classic White Sneakers',
        slug: 'eroica-classic-white-sneakers',
        description: 'Timeless white sneakers made with eco-friendly materials.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Shoes',
        stock: 35
      },
      {
        name: 'Eroica Smartwatch Series 3',
        slug: 'eroica-smartwatch-series-3',
        description: 'Elegant smartwatch with fitness and productivity features.',
        price: 229.99,
        image: 'https://images.unsplash.com/photo-1542541864-4abf21a55761?q=80&w=703&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Tech',
        stock: 15
      },
      {
        name: 'Eroica Blue Denim Jacket',
        slug: 'eroica-blue-denim-jacket',
        description: 'Iconic denim jacket with modern tailoring and comfort.',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1527016021513-b09758b777bd?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Apparel',
        stock: 10
      },
      {
        name: 'Eroica Stainless Steel Water Bottle',
        slug: 'eroica-steel-water-bottle',
        description: 'Insulated water bottle that keeps your drink cold for 24 hours.',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Accessories',
        stock: 50
      },
      {
        name: 'Eroica Noise Cancelling Headphones',
        slug: 'eroica-headphones',
        description: 'Wireless headphones with exceptional noise isolation.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1612478120679-5b7412e15f84?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Audio',
        stock: 25
      }
    ]
  })
}

main()
  .then(() => {
    console.log('🌱 Seed completed.')
    db.$disconnect()
  })
  .catch(e => {
    console.error(e)
    db.$disconnect()
    process.exit(1)
  })
