export interface Notification {
    id: string; 
    userId: string;
    message: string;
    type: 'ORDER_UPDATE' | 'STOCK_ALERT' | 'PROMOTION' | 'INFO';
    isRead: boolean;
    createdAt: string; 
}

export interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}