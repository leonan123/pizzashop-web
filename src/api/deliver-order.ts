import { api } from '@/lib/axios'

export interface TDeliverOrderBody {
  orderId: string
}

export async function deliverOrder({ orderId }: TDeliverOrderBody) {
  await api.patch(`/orders/${orderId}/deliver`)
}
