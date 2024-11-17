import { http, HttpResponse } from 'msw'

import type { TGetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  TGetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    {
      product: 'Pizza 01',
      amount: 5,
    },
    {
      product: 'Pizza 02',
      amount: 20,
    },
    {
      product: 'Pizza 03',
      amount: 10,
    },
    {
      product: 'Pizza 04',
      amount: 2,
    },
    {
      product: 'Pizza 05',
      amount: 41,
    },
  ])
})
