import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: '123',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: '123' }),
        expect.objectContaining({ recipientId: '123' }),
      ]),
    );
  });
});
