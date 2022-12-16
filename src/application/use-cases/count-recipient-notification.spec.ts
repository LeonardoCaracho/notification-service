import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '@application/entitites/notification';
import { Content } from '@application/entitites/content';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipient notification', () => {
  it('should be able to count the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    const notification = new Notification({
      content: new Content('teste'),
      category: 'social',
      recipientId: '123',
    });

    await notificationsRepository.create(notification);

    const result = await countRecipientNotification.execute({
      recipientId: notification.recipientId,
    });

    expect(result.count).toEqual(1);
  });
});
