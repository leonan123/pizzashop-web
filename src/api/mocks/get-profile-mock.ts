import { http, HttpResponse } from 'msw'

import type { IGetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, IGetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'john doe',
      email: 'johndoe@example.com',
      phone: '55997024446',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
