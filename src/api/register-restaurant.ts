import { api } from '@/lib/axios'

export interface IRegisterRestaurantBody {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export async function registerRestaurant({
  email,
  restaurantName,
  managerName,
  phone,
}: IRegisterRestaurantBody) {
  await api.post('/restaurants', { email, restaurantName, managerName, phone })
}
