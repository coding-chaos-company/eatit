import * as feedAPI from '@/contents/api/feed';
import { waitForAdvanceTimers } from '@/tests/unit/utils/wait-for-advance-timers';
import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import type { AnimationEvent, ChangeEvent, RefObject } from 'react';
import { useDinoHomeHandler } from './use-dino-home-handler';

describe('useDinoHomeHandler', () => {
  const setServing = jest.fn();
  const setDinoBehavier = jest.fn();
  const setDinoStatus = jest.fn();

  const mutationsMock = {
    setServing,
    setDinoBehavier,
    setDinoStatus,
  };

  const areaRef = {
    current: { getBoundingClientRect: () => ({ left: 100 }) },
  } as RefObject<HTMLDivElement>;
  const dinoRef = {
    current: { getBoundingClientRect: () => ({ left: 150 }) },
  } as RefObject<HTMLDivElement>;

  describe('handleClickFeedButton', () => {
    test('ボタンを押すとエサが落ちてきて、dinoがエサの方に向かう', () => {
      const { result } = renderHook(() =>
        useDinoHomeHandler(
          {
            areaRef,
            dinoRef,
            dinoBehavier: {
              startPos: 0,
              direction: 'right',
              animation: 'walking',
              state: 'walk',
            },
          },
          mutationsMock
        )
      );

      act(() => {
        result.current.handleClickFeedButton();
      });

      // エサが落ちてくる
      expect(setServing).toHaveBeenCalledWith(true);

      // dinoがご飯の方に移動する
      expect(setDinoBehavier).toHaveBeenCalledWith({
        startPos: 50, // ボタンを押した時の位置がstartPosになっている
        direction: 'right',
        animation: 'toBowl',
      });
    });
  });

  describe('handleDinoAnimationIteration', () => {
    test('端まで歩くとdinoの向きが変わる', () => {
      const { result } = renderHook(() =>
        useDinoHomeHandler(
          {
            areaRef,
            dinoRef,
            dinoBehavier: {
              startPos: 0,
              direction: 'right', // 右を向いている状態
              animation: 'walking',
              state: 'walk',
            },
          },
          mutationsMock
        )
      );

      // 端まで歩く
      act(() => {
        result.current.handleDinoAnimationIteration({
          animationName: 'walking',
        } as AnimationEvent<HTMLImageElement>);
      });

      // 左を向く
      expect(setDinoBehavier).toHaveBeenCalledWith({ direction: 'left' });
    });

    test('エサを食べ終わって左端まで歩いて戻った後、walkingアニメーションに戻る', () => {
      const { result } = renderHook(() =>
        useDinoHomeHandler(
          {
            areaRef,
            dinoRef,
            dinoBehavier: {
              startPos: 0,
              direction: 'right', // 右を向いている状態
              animation: 'walking',
              state: 'walk',
            },
          },
          mutationsMock
        )
      );

      // ご飯を食べ終わって左端まで戻った状態
      act(() => {
        result.current.handleDinoAnimationIteration({
          animationName: 'toWalking',
        } as AnimationEvent<HTMLImageElement>);
      });

      // walkingアニメーションに戻る
      expect(setDinoBehavier).toHaveBeenCalledWith({
        animation: 'walking',
        direction: 'right',
        startPos: 0,
      });
    });

    test('エサが落ちてからのアニメーションが正しく行われる', async () => {
      jest.useFakeTimers();

      const feedApiMock = jest.spyOn(feedAPI, 'put').mockResolvedValue({
        status: {
          color: 'green',
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

      const { result } = renderHook(() =>
        useDinoHomeHandler(
          {
            areaRef,
            dinoRef,
            dinoBehavier: {
              startPos: 0,
              direction: 'right',
              animation: 'walking',
              state: 'walk',
            },
          },
          mutationsMock
        )
      );

      // エサが落ちて、bowlの位置まで来ている状態
      act(() => {
        result.current.handleDinoAnimationIteration({
          animationName: 'toBowl',
        } as AnimationEvent<HTMLImageElement>);
      });

      // bend状態に移行している
      expect(setDinoBehavier).toHaveBeenCalledWith({
        startPos: 'calc(100% - 160px)',
        animation: 'stop',
        state: 'bend',
      });

      // bendのgifアニメーションが終わるまで時間を進める
      await waitForAdvanceTimers(2000);

      // bendが終わった後、eat状態に移行している
      expect(setDinoBehavier).toHaveBeenCalledWith({ state: 'eat' });

      // 3秒ご飯を食べる
      await waitForAdvanceTimers(3000);

      // ご飯を食べるのをやめて、左端まで歩いて戻る
      expect(setDinoBehavier).toHaveBeenCalledWith({
        animation: 'toWalking',
        direction: 'left',
        state: 'walk',
      });

      // エサがなくなっている
      expect(setServing).toHaveBeenCalledWith(false);

      // feedAPIが呼び出されたことを確認
      expect(feedApiMock).toHaveBeenCalledWith({ github_name: 'k1tikurisu' });

      // dinoの状態がfeedAPIの返り値になることを確認
      expect(setDinoStatus).toHaveBeenCalledWith({
        color: 'green',
        kind: 'brachio',
        level: 1,
        loop: 1,
        exp: 10,
      });

      // clean up
      jest.runAllTimers();
      jest.useRealTimers();
    });
  });
});
