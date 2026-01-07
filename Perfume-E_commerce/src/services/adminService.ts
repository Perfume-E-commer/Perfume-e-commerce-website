import api from './apiClient'

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  pendingOrders: number;
  canceledOrders: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: Array<{ productName: string; quantity: number }>;
  shippingAddress?: { fullName: string };
}

export interface BillingRecord {
  orderId: string;
  orderNumber: string;
  customerEmail: string; 
  totalAmount: number;
  paymentStatus: string;
  date: string; 
}

export const adminService = {
  getDashboardStats() {
    return api.get<DashboardStats>('/admin/dashboard-stats');
  },

  getAllOrders() {
    return api.get('/admin/orders'); 
  },

  updateOrderStatus(orderId: string, status: string) {
    return api.put(`/admin/orders/${orderId}/status`, null, {
      params: { status }
    });
  },

  getBillingRecords() {
    return api.get<BillingRecord[]>('/admin/billing');
  }
}

export default adminService;