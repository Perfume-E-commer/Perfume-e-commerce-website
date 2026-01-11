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
    return api.get<CustomerResponse>('/users/search', { 
      params: {
        query: params.search,
        page: params.page,
        size: params.size,
        ...params.filters 
      }
    });
  },

  getCustomerStats() {
    return api.get<CustomerStats>('/users/stats');
  },

  getCustomerDetails(id: string) {
    return api.get<{ customer: Customer; orders: CustomerOrderHistory[] }>(`/users/${id}/details`);
  },

  deleteUser(id: string) {
    return api.delete(`/users/${id}`);
  },
  
  exportCustomers() {
    return api.get('/users/export', { responseType: 'blob' });
  }
};

export type User = Customer;

export default customerService;