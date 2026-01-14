import api from './apiClient'; 

export interface Address {
  fullName: string;
  houseNumber: string;
  street: string;
  village: string;
  community: string;
  district: string;
  city: string;
  phoneNumber: string;
}

export interface Product {
  id: string;
  name: string;
  brand?: string;
  variance?: string;
  imageUrl: string;
  category?: string;
  occasion?: string;
  price: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand?: string;
  variant?: string;
  imageUrl?: string;
  category?: string;
  occasion?: string;
  price: number;
  quantity: number;
}

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
  items: OrderItem[];
  shippingAddress: Address;
}

class OrderService {
  async getMyOrders(): Promise<Order[]> {
    const response = await api.get('/orders/my-orders');
    return response.data;
  }

  async placeOrder(orderData: any) {
    return api.post('/orders', orderData);
  }

  async cancelOrder(orderId: string) {
    return api.post(`/orders/${orderId}/cancel`);
  }
}

export default new OrderService();