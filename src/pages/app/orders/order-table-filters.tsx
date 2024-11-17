import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type TOrderFilter = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { handleSubmit, register, control, resetField } = useForm<TOrderFilter>(
    {
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId: searchParams.get('orderId') ?? '',
        customerName: searchParams.get('customerName') ?? '',
        status: searchParams.get('status') ?? 'all',
      },
    },
  )

  function handleFilter(data: TOrderFilter) {
    setSearchParams((activeParams) => {
      const filterEntries = Object.entries(data)

      filterEntries.forEach(([key, value]) => {
        if (value) {
          activeParams.set(key, value)
        } else {
          activeParams.delete(key)
        }
      })

      activeParams.set('page', '1')

      return activeParams
    })
  }

  function handleResetFilters() {
    setSearchParams((activeParams) => {
      const searchParamsKeys = [
        ...activeParams.keys(),
      ] as (keyof TOrderFilter)[]

      searchParamsKeys.forEach((key) => {
        activeParams.delete(key)
        resetField(key)
      })

      activeParams.set('page', '1')

      return activeParams
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleResetFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
