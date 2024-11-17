import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'

import { approveOrder } from '@/api/approve-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { Button } from '@/components/ui/button'

import { updateOrderStatusOnCache } from './helpers/update-order-status-on-cache'
import { TOrderStatus } from './order-status'

interface IOrderActionByStatusProps {
  status: TOrderStatus
  orderId: string
}

export function OrderActionByStatus({
  status,
  orderId,
}: IOrderActionByStatusProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: approveOrderFn, isPending: isApproveOrderPending } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess() {
        updateOrderStatusOnCache({
          orderId,
          status: 'processing',
          client: queryClient,
        })
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchOrderPending } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess() {
        updateOrderStatusOnCache({
          orderId,
          status: 'delivering',
          client: queryClient,
        })
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliverOrderPending } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess() {
        updateOrderStatusOnCache({
          orderId,
          status: 'delivered',
          client: queryClient,
        })
      },
    })

  switch (status) {
    case 'pending':
      return (
        <Button
          variant="outline"
          size="xs"
          disabled={isApproveOrderPending}
          onClick={() => approveOrderFn({ orderId })}
        >
          <ArrowRight className="mr-2 size-3" />
          Aprovar
        </Button>
      )

    case 'processing':
      return (
        <Button
          variant="outline"
          size="xs"
          disabled={isDispatchOrderPending}
          onClick={() => dispatchOrderFn({ orderId })}
        >
          <ArrowRight className="mr-2 size-3" />
          Em entrega
        </Button>
      )

    case 'delivering':
      return (
        <Button
          variant="outline"
          size="xs"
          disabled={isDeliverOrderPending}
          onClick={() => deliverOrderFn({ orderId })}
        >
          <ArrowRight className="mr-2 size-3" />
          Entregue
        </Button>
      )

    default:
      return null
  }
}
