import * as registerAPI from '@/contents/api/register';
import { waitForAdvanceTimers } from '@/tests/unit/utils/wait-for-advance-timers';
import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import type { AnimationEvent, ChangeEvent, RefObject } from 'react';
import { useDinoSelectionHandler } from './use-dino-selection-handler';

describe('useDinoSelectionHandler', () => {
  const setColor = jest.fn();
  const setSplitting = jest.fn();
  const setDinoStatus = jest.fn();

  const mutationsMock = {
    setColor,
    setSplitting,
    setDinoStatus,
  };

  describe('handleChangeColorHandler', () => {
    test('colorの値を変更できる', () => {
      const { result } = renderHook(() =>
        useDinoSelectionHandler(
          {
            color: 'green',
            level: 1,
          },
          mutationsMock
        )
      );

      act(() => {
        result.current.handleChangeColorHandler({
          target: { value: 'pink' },
        } as ChangeEvent<HTMLInputElement>);
      });

      // pinkに変わる
      expect(setColor).toHaveBeenCalledWith('pink');
    });
  });

  describe('handleClickStartButton', () => {
    test('スタートボタンを押した後、卵が割れてゲームが始まる', async () => {
      jest.useFakeTimers();

      const mockRegisterAPI = jest.spyOn(registerAPI, 'post').mockResolvedValue({
        status: {
          color: 'pink',
          kind: 'brachio',
          level: 1,
          loop: 1,
          exp: 10,
        },
      });

      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/k1tikurisu',
        },
      });

      // テストの開始時刻を記録
      // const start = performance.now();

      const { result } = renderHook(() =>
        useDinoSelectionHandler(
          {
            color: 'pink',
            level: 1,
          },
          mutationsMock
        )
      );

      // startボタンを押す
      act(() => {
        result.current.handleClickStartButton();
      });

      // 卵が割れる
      expect(setSplitting).toHaveBeenCalledWith(true);

      // 登録APIが呼ばれる
      expect(mockRegisterAPI).toHaveBeenCalledWith({
        github_name: 'k1tikurisu',
        color: 'pink',
        level: 1,
      });

      // まだdinoは現れていない
      expect(setDinoStatus).not.toHaveBeenCalled();

      // 卵が割れるまで待つ
      await waitForAdvanceTimers(9400);

      // dinoが現れる
      expect(setDinoStatus).toHaveBeenCalledWith({
        color: 'pink',
        level: 1,
      });

      // clean up
      jest.runAllTimers();
      jest.useRealTimers();
    });
  });
});
