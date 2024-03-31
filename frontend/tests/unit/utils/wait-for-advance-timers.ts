import { act } from '@testing-library/react';

export const waitForAdvanceTimers = async (ms: number) => {
  await act(async () => {
    await new Promise((resolve) => {
      jest.advanceTimersByTime(ms);
      resolve('');
    });
  });
};
