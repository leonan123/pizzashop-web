import { http, HttpResponse } from 'msw'

import type { IGetOrdersResponse } from '@/api/get-orders'
import type { TOrderStatus } from '@/pages/app/orders/order-status'

type TOrders = IGetOrdersResponse['orders']

const statuses: TOrderStatus[] = [
  'pending',
  'processing',
  'canceled',
  'delivered',
  'delivering',
]

const orders: TOrders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    customerName: `Customer ${i + 1}`,
    createdAt: new Date().toISOString(),
    total: 2400,
    status: statuses[i % 5],
  }
})

export const getOrdersMock = http.get<never, never, IGetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) => {
        return order.customerName.includes(customerName)
      })
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) => {
        return order.orderId.includes(orderId)
      })
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => {
        return order.status === status
      })
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
