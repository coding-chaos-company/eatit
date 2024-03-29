import { getUserName } from './get-user-name';

describe('getUserName', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/k1tikurisu',
      },
    });
  });

  test('ユーザ名が取得できる', async () => {
    expect(getUserName()).toBe('k1tikurisu');
  });
});
