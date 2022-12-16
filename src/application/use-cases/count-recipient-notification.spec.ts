import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipient notification', () => {
  it('should be able to count the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    const result = await countRecipientNotification.execute({
      recipientId: '123',
    });

    expect(result.count).toEqual(2);
  });
});
