// src/services/orderService.ts
import axios from 'axios'

export default {
  // Fetch orders for the logged-in user
  getUserOrders: () => axios.get('/api/orders/user'),

  // Fetch all orders (admin)
  getAllOrders: () => axios.get('/api/orders'),

  // Update order status (admin)
  updateOrderStatus: (id: number, status: string) =>
    axios.patch(`/api/orders/${id}`, { status }),
}
