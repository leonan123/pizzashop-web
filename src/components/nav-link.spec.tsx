import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('Should highlight the nav link when is the current page link', () => {
    const wrapper = render(
      <>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/orders">Pedidos</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/orders']}>{children}</MemoryRouter>
        ),
      },
    )

    expect(wrapper.getByText('Pedidos').dataset.current).toEqual('true')
  })
})
