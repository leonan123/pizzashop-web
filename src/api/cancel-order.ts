import { api } from '@/lib/axios'

export interface TCancelOrderBody {
  orderId: string
}

export async function cancelOrder({ orderId }: TCancelOrderBody) {
  await api.patch(`/orders/${orderId}/cancel`)
}
