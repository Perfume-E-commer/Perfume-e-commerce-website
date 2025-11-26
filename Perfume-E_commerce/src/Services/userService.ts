import apiClient from './apiClient';

export default {
  getProfile() {
    return apiClient.get('/users/profile');
  },
  updateProfile(data: any) {
    return apiClient.put('/users/profile', data);
  },
  uploadAvatar(file: File) {
    return new Promise((resolve) => {
        setTimeout(() => resolve("https://i.pravatar.cc/150?img=3"), 1000);
    });
  }
};