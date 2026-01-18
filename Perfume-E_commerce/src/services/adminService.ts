import api from './apiClient'

export interface DailySalesData {
  date: string;
  revenue: number;
  orderCount: number;
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

export interface LowStockItem {
  id: string;
  name: string;
  stock: number;
  imageUrl?: string;
}

export interface ActivePromotion {
  id: string;
  code: string;
  discountPercentage: number;
  validUntil: string;
}

export interface AdminDashboardResponse {
  totalOrders30d: number;
  revenue30d: number;
  lowStockCount: number;
  activeCustomers: number;
  salesChart: DailySalesData[];
  recentOrders: RecentOrder[];
  lowStockItems: LowStockItem[];
  activePromotions: ActivePromotion[];
}
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

export interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl?: string;
  street?: string;
  city?: string;
  zipCode?: string;
}

export const adminService = {
  getDashboardStats() {
    return api.get<DashboardStats>('/admin/dashboard-stats');
  },

  getAllOrders(params: { page: number; size: number; search: string } = { page: 0, size: 10, search: '' }) {
    return api.get<any>('/orders', { 
      params: {
        page: params.page,
        size: params.size,
        search: params.search
      }
    });
  },

  getAllProducts(page: number, size: number, search: string = '') {
    return this.getProducts({ page, size, search });
  },

  getProducts(params: { page: number; size: number; search: string } = { page: 0, size: 10, search: '' }) {
    return api.get('/admin/products', { 
      params: {
        page: params.page,
        size: params.size,
        search: params.search
      }
    });
  },

  updateOrderStatus(orderId: string, status: string) {
    return api.put(`/admin/orders/${orderId}/status`, null, {
      params: { status }
    });
  },

  getBillingRecords() {
    return api.get<BillingRecord[]>('/admin/billing');
  },

  getProfile() {
    return api.get<AdminProfile>('/admin/profile');
  },
  
  updateProfile(data: Partial<AdminProfile>, imageFile?: File) {
    const formData = new FormData();
    
    formData.append('data', new Blob([JSON.stringify(data)], { 
      type: 'application/json' 
    }));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return api.put('/admin/profile', formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
    });
  },

  updatePaymentStatus(orderId: string, paymentStatus: string) {
    return api.put(`/admin/orders/${orderId}/payment-status`, null, {
      params: { status: paymentStatus }
    });
  },

  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
}

export default adminService;