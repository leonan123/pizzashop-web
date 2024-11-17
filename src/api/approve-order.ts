import { api } from '@/lib/axios'

export interface TApproveOrderBody {
  orderId: string
}

export async function approveOrder({ orderId }: TApproveOrderBody) {
  await api.patch(`/orders/${orderId}/approve`)
}
