import { http, HttpResponse } from 'msw'

import type { IGetMonthRevenueResponse } from '../get-month-revenue'

export const getMonthRevenueOrdersAmountMock = http.get<
  never,
  never,
  IGetMonthRevenueResponse
>('/metrics/month-receipt', async () => {
  return HttpResponse.json({
    diffFromLastMonth: 10,
    receipt: 20000,
  })
})
