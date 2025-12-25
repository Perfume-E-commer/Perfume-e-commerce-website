import apiClient from './apiClient';
import type { Notification } from '@/types/notification.types';

export default {
    async getUserNotifications(): Promise<Notification[]> {
        const response = await apiClient.get('/notifications');
        return response.data;
    },

    async markAsRead(id: string): Promise<void> {
        await apiClient.put(`/notifications/${id}/read`);
    },

    async markAllAsRead(): Promise<void> {
        await apiClient.put('/notifications/read-all');
    },

    async deleteNotification(id: string): Promise<void> {
        await apiClient.delete(`/notifications/${id}`);
    }
};