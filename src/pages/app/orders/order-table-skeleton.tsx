import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      {/* Open details */}
      <TableCell>
        <Button variant="outline" size="xs" disabled>
          <Search className="size-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>

      {/* ID */}
      <TableCell>
        <Skeleton className="h-4 w-[160px]" />
      </TableCell>

      {/* Done There */}
      <TableCell>
        <Skeleton className="h-4 w-[110px]" />
      </TableCell>

      {/* Status */}
      <TableCell>
        <Skeleton className="h-4 w-[110px]" />
      </TableCell>

      {/* Client Name */}
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>

      {/* Total Price */}
      <TableCell>
        <Skeleton className="h-4 w-[64px]" />
      </TableCell>

      {/* Actions */}
      <TableCell>
        <Skeleton className="h-4 w-[92px]" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-4 w-[92px]" />
      </TableCell>
    </TableRow>
  ))
}
