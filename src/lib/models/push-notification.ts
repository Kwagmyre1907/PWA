export interface PushNotification {
  actions: NotificationAction[];
  badge: string;
  body: string;
  data: any;
  dir: string;
  icon: string;
  image: string;
  lang: string;
  renotify: boolean;
  requireInteraction: boolean;
  silent: boolean;
  tag: string;
  timestamp: DOMTimeStamp;
  title: string;
  vibrate: number[];
}
