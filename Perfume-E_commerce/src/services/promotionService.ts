import api from './apiClient';

export interface Promotion {
  id?: string;
  code: string;
  description: string;
  discountPercent: number;
  validUntil: string; 
  active?: boolean;
  createdAt?: string;
}

export const promotionService = {
  getAllPromotions(params: { page: number; size: number; search: string } = { page: 0, size: 10, search: '' }) {
    return api.get('/promotions', { 
      params: {
        page: params.page,
        size: params.size,
        search: params.search
      }
    });
  },

  createPromotion(data: Promotion) {
    return api.post('/promotions', data);
  },

  updatePromotion(id: string, data: Promotion) {
    return api.put(`/promotions/${id}`, data);
  },

  togglePromotion(id: string) {
    return api.patch(`/promotions/${id}/toggle`);
  },

  deletePromotion(id: string) {
    return api.delete(`/promotions/${id}`);
  }
}

export default promotionService;