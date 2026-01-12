import api from './apiClient';

export interface Transaction {
  id: string;
  orderId: string; 
  userEmail: string;
  amount: number;
  status: string;
  date: string;
  paymentMethod?: string;
}

export const transactionService = {
  getAllTransactions(params: { page: number; size: number; search: string }) {
    return api.get('/orders', { 
      params: {
        page: params.page,
        size: params.size,
        search: params.search 
      }
    });
  }
};

export default transactionService;