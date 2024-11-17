import { DialogTrigger } from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
import { IOrder } from '@/api/get-orders'
import { SpinIcon } from '@/components/spin-icon'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { updateOrderStatusOnCache } from './helpers/update-order-status-on-cache'
import { OrderActionByStatus } from './order-action-by-status'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

interface IOrderTableRowProps {
  order: IOrder
}

export function OrdersTableRow({ order }: IOrderTableRowProps) {
  const queryClient = useQueryClient()

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: cancelOrderFn, isPending: isCancelOrderPending } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess() {
        updateOrderStatusOnCache({
          orderId: order.orderId,
          status: 'canceled',
          client: queryClient,
        })
      },
    })

  return (
    <TableRow>
      {/* Open details */}
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      {/* ID */}
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      {/* Done There */}
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      {/* Status */}
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      {/* Client */}
      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <OrderActionByStatus status={order.status} orderId={order.orderId} />
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={
            !['processing', 'pending'].includes(order.status) ||
            isCancelOrderPending
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          {isCancelOrderPending ? (
            <>
              <SpinIcon className="mr-2 size-3" />
              Cancelando...
            </>
          ) : (
            <>
              <X className="mr-2 size-3" />
              Cancelar
            </>
          )}
        </Button>
      </TableCell>
    </TableRow>
  )
}
