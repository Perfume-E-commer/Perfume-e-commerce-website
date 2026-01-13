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
}

export default new UserService();