import api from './apiClient';

export interface Promotion {
  id?: string;
  code: string;
  description: string;
  discountPercent: number;
  validUntil: string; // Date string
  isActive?: boolean;
}

export const promotionService = {
  // Get All Promotions
  getAllPromotions() {
    return api.get<Promotion[]>('/promotions/admin');
  },

  // Create Promotion
  createPromotion(data: Promotion) {
    return api.post('/promotions', data);
  },

  // Update Promotion
  updatePromotion(id: string, data: Promotion) {
    return api.put(`/promotions/${id}`, data);
  },

  // Toggle Active Status
  togglePromotion(id: string) {
    return api.patch(`/promotions/${id}/toggle`);
  },

  // Delete (Soft Delete)
  deletePromotion(id: string) {
    return api.delete(`/promotions/${id}`);
  }
}

export default promotionService;