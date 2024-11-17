import { QueryClient } from '@tanstack/react-query'

import { IGetOrdersResponse } from '@/api/get-orders'

import { TOrderStatus } from '../order-status'

interface IUpdateOrderStatusOnCache {
  orderId: string
  status: TOrderStatus
  client: QueryClient
}

export function updateOrderStatusOnCache({
  orderId,
  status,
  client,
}: IUpdateOrderStatusOnCache) {
  const ordersListCached = client.getQueriesData<IGetOrdersResponse>({
    queryKey: ['orders'],
  })

  ordersListCached.forEach(([cacheKey, cacheData]) => {
    if (!cacheData) return

    client.setQueryData<IGetOrdersResponse>(cacheKey, {
      ...cacheData,
      orders: cacheData.orders.map((cacheOrder) => {
        if (cacheOrder.orderId === orderId) {
          return {
            ...cacheOrder,
            status,
          }
        }

        return cacheOrder
      }),
    })
  })
}
