import { api } from '@/lib/axios'

export type TGetPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api.get<TGetPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
