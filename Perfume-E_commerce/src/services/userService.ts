import api from './apiClient'

export interface Address {
  houseNumber: string;
  street: string;
  village: string;
  community: string;
  district: string;
  city: string;
  zipCode: string;
  fullName: string;
  phoneNumber?: string;
  type?: string;
  isDefault?: boolean;
}

export interface CreditCard {
  id?: string;
  cardHolderName: string;
  cardNumber: string; 
  expirationDate: string;
  cvv: string;
  cardType?: string;
}

class UserService {
  getProfile() {
    return api.get('/users/profile');
  }

  updateProfile(data: any) {
    return api.put('/users/profile', data);
  }

  addAddress(address: Address) {
    return api.post('/users/address', address);
  }

  addCreditCard(card: CreditCard) {
    return api.post('/users/card', card);
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  changePassword(data: any) {
    return api.post('/users/change-password', data);
  }

  deleteAddress(addressId: string) {
    return api.delete(`/users/address/${addressId}`);
  }

  deleteCreditCard(cardId: string) {
    return api.delete(`/users/card/${cardId}`);
  }
}

export default new UserService();