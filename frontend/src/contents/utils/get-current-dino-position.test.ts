import { render } from '@testing-library/react';
import { getCurrentDinoPosition } from './get-current-dino-position';
import { RefObject } from 'react';

describe('getCurrentDinoPosition', () => {
  test('親要素からの相対位置が返ってくる', async () => {
    const parentRef = {
      current: {
        getBoundingClientRect: () => ({ left: 100 }),
      },
    } as RefObject<HTMLElement>;

    const childRef = {
      current: {
        getBoundingClientRect: () => ({ left: 150 }),
      },
    } as RefObject<HTMLElement>;

    expect(getCurrentDinoPosition(parentRef, childRef)).toBe(50);
  });
});
