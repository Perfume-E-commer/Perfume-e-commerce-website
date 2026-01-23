import api from './apiClient';

export const contactService = {
  sendMessage(data: { name: string; email: string; subject: string; message: string }) {
    return api.post('/contact', data);
  }
};