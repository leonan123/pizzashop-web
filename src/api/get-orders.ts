import { api } from '@/lib/axios'

export interface IOrder {
  orderId: string
  createdAt: string
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  customerName: string
  total: number
}

export interface IGetOrdersResponse {
  orders: IOrder[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export interface IGetOrdersQuery {
  pageIndex: number | null
  orderId: string | null
  customerName: string | null
  status: string | null
}

export async function getOrders({
  pageIndex,
  orderId,
  customerName,
  status,
}: IGetOrdersQuery) {
  const response = await api.get<IGetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      orderId,
      customerName,
      status: status === 'all' ? null : status,
    },
  })

  return response.data
}
