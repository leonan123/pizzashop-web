import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text based on order status', () => {
    // PENDING
    let wrapper = render(<OrderStatus status="pending" />)

    let statusText = wrapper.getByText('Pendente')
    let badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-slate-400')

    wrapper.unmount()

    // CANCELED
    wrapper = render(<OrderStatus status="canceled" />)

    statusText = wrapper.getByText('Cancelado')
    badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-rose-500')

    wrapper.unmount()

    // PROCESSING
    wrapper = render(<OrderStatus status="processing" />)

    statusText = wrapper.getByText('Em preparo')
    badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-amber-500')

    wrapper.unmount()

    // DELIVERING
    wrapper = render(<OrderStatus status="delivering" />)

    statusText = wrapper.getByText('Em entrega')
    badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-sky-500')

    wrapper.unmount()

    // DELIVERED
    wrapper = render(<OrderStatus status="delivered" />)

    statusText = wrapper.getByText('Entregue')
    badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass('bg-emerald-500')

    wrapper.unmount()
  })
})
