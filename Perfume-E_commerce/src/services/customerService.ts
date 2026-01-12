import api from './apiClient';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  roles?: { id: string; name: string }[];
  active?: boolean; 
}

export interface UserResponse {
  content: User[];
  totalPages: number;
  totalElements: number;
  page?: { 
     totalPages: number;
     totalElements: number;
  }
}

export const customerService = {
  getCustomers(params: { page: number; size: number; search: string }) {
    return api.get<UserResponse>('/users/search', { params: {
      query: params.search,
      page: params.page,
      size: params.size
    }});
  },

  deleteUser(id: string) {
    return api.delete(`/users/${id}`);
  }
};

export default customerService;