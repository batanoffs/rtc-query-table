import { NotificationInstance } from 'antd/es/notification/interface';

class NotificationService {
  private static instance: NotificationService;
  private notificationApi: NotificationInstance | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  setNotificationApi(api: NotificationInstance) {
    this.notificationApi = api;
  }

  success(config: Parameters<NotificationInstance['success']>[0]) {
    if (this.notificationApi) {
      this.notificationApi.success(config);
    }
  }

  error(config: Parameters<NotificationInstance['error']>[0]) {
    if (this.notificationApi) {
      this.notificationApi.error(config);
    }
  }

  info(config: Parameters<NotificationInstance['info']>[0]) {
    if (this.notificationApi) {
      this.notificationApi.info(config);
    }
  }

  warning(config: Parameters<NotificationInstance['warning']>[0]) {
    if (this.notificationApi) {
      this.notificationApi.warning(config);
    }
  }

  destroy(key?: string) {
    if (this.notificationApi) {
      this.notificationApi.destroy(key);
    }
  }
}

export default NotificationService.getInstance();
