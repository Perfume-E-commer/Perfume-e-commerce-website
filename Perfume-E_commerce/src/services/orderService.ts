import api from './apiClient'; 

export interface Order {
  id: string;
  orderId: string;
  orderDate: string;
  status: string;
  subtotal: number;
  totalItems: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  placedDate: string;
  shippedDate?: string;
  estimatedArrivalDate?: string;
  items: any[];
}

class OrderService {
  async getMyOrders(): Promise<Order[]> {
    const response = await api.get('/orders/my-orders');
    return response.data;
  }

  async placeOrder(orderData: any) {
    return api.post('/orders', orderData);
  }
}

export default new OrderService();