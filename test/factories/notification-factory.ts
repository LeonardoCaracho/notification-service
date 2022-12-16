import { Content } from '@application/entitites/content';
import {
  Notification,
  NotificationProps,
} from '@application/entitites/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('teste'),
    category: 'social',
    recipientId: '123',
    ...override,
  });
}
