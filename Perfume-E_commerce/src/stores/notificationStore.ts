import {defineStore} from 'pinia';
import notificationService from '@/services/notificationService';
import type { Notification, NotificationState } from '@/types/notification.types';

export const useNotificationStore = defineStore('notifications', {
    state: (): NotificationState => ({
        notifications: [],
        loading: false,
        error: null,
    }),

    getters: {
        unreadCount: (state) => state.notifications.filter(n => !n.isRead).length,
        
        sortedNotifications: (state) => {
            return [...state.notifications].sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
    },

    actions: {
        async fetchNotifications() {
            this.loading = true;
            try {
                this.notifications = await notificationService.getUserNotifications();
            } catch (err: any) {
                this.error = 'Failed to load notifications';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        async markRead(id: string) {
            const notification = this.notifications.find(n => n.id === id);
            if (notification && !notification.isRead) {
                notification.isRead = true;
                try {
                    await notificationService.markAsRead(id);
                } catch (err) {
                    notification.isRead = false; 
                    console.error('Failed to mark as read', err);
                }
            }
        },

        async markAllRead() {
            this.notifications.forEach(n => n.isRead = true);

            try {
                await notificationService.markAllAsRead();
            } catch (err) {
                console.error('Failed to mark all as read', err);
                this.fetchNotifications(); 
            }
        }
    }
});