import { api } from '@/lib/axios'

export interface TDispatchOrderBody {
  orderId: string
}

export async function dispatchOrder({ orderId }: TDispatchOrderBody) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
