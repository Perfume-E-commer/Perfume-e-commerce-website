import api from './apiClient';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  roles?: { id: string; name: string }[];
  active?: boolean;
  
  joinedAt?: string;       
  ordersCount?: number;
  totalSpent?: number;
  lastOrderDate?: string;  
  address?: string;        
}

export interface CustomerStats {
  totalCustomers: number;
  avgSpend: number;
  returningCustomers: number; 
  newThisMonth: number;
}

export interface CustomerOrderHistory {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  itemCount: number;
}

export interface CustomerResponse {
  content: Customer[];
  totalPages: number;
  totalElements: number;
  page?: { 
     totalPages: number;
     totalElements: number;
  }
}

export const customerService = {
  getCustomers(params: { 
    page: number; 
    size: number; 
    search: string;
    filters?: {
      orderCount?: string;  
      spendingTier?: string; 
    }
  }) {
    return api.get<CustomerResponse>('/admin/customers/search', { 
      params: {
        query: params.search,
        page: params.page,
        size: params.size,
      }
    });
  },

  getCustomerStats() {
    return api.get<CustomerStats>('/admin/customers/stats');
  },

  getCustomerDetails(id: string) {
    return api.get<{ customer: Customer; orders: CustomerOrderHistory[] }>(`/admin/customers/${id}/details`);
  },

  deleteUser(id: string) {
    return api.delete(`/users/${id}`); 
  },
  
  exportCustomers() {
    return api.get('/admin/customers/export', { responseType: 'blob' });
  }
};

export type User = Customer;

export default customerService;