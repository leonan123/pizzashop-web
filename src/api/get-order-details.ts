import { api } from '@/lib/axios'
import { TOrderStatus } from '@/pages/app/orders/order-status'

export interface IGetOrderDetailsBody {
  orderId: string
}

export interface IGetOrderDetailsResponse {
  status: TOrderStatus
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: IGetOrderDetailsBody) {
  const response = await api.get<IGetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
