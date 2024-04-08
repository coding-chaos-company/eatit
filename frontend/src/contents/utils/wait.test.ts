import { wait } from './wait';

describe('wait', () => {
  test('指定の秒数でsetTimeoutが呼び出される', async () => {
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');

    const delay = 1000;

    await wait(delay);

    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenLastCalledWith(expect.any(Function), delay);
  });

  test.todo('wait中に離脱した場合、エラーをthrowする');
});
