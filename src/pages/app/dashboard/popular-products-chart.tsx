import { useQuery } from '@tanstack/react-query'
import { BarChart } from 'lucide-react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getPopularProducts } from '@/api/get-popular-products'
import { SpinIcon } from '@/components/spin-icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = [
  colors.sky[500],
  colors.rose[500],
  colors.violet[500],
  colors.amber[500],
  colors.emerald[500],
]

interface CustomizeLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}

function RenderCustomizeLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizeLabelProps) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function PopularProductsChart() {
  const { data: popularProducts, isPending: isPopularProductsPending } =
    useQuery({
      queryKey: ['metrics', 'popular-products'],
      queryFn: getPopularProducts,
    })

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>

          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        {isPopularProductsPending && (
          <div className="flex h-[240px] items-center justify-center">
            <SpinIcon className="size-10" />
          </div>
        )}

        {popularProducts && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }} data={popularProducts}>
              <Legend
                verticalAlign="top"
                align="right"
                layout="vertical"
                formatter={(legend: string, entry) => {
                  // "entry" type is incorrect in recharts
                  const { payload } = entry as unknown as {
                    payload: { percent: number }
                  }

                  const total = popularProducts.reduce(
                    (acc, item) => acc + item.amount,
                    0,
                  )

                  const unitAmount = total * payload.percent

                  return legend.length > 16
                    ? legend
                        .substring(0, 16)
                        .concat(`... (${unitAmount.toFixed(0)})`)
                    : legend.concat(` (${unitAmount.toFixed(0)})`)
                }}
              />
              <Pie
                dataKey="amount"
                nameKey="product"
                data={popularProducts}
                cx="50%"
                cy="50%"
                outerRadius={105}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={RenderCustomizeLabel}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-card hover:opacity-80"
                  >
                    <Tooltip />
                  </Cell>
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
