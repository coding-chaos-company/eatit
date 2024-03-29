import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { usePageStore } from './use-page-store';

describe('usePageStore', () => {
  test('storeの初期値が指定した値である', () => {
    const { result } = renderHook(() => usePageStore());

    expect(result.current.dinoStatus).toBe(null);
    expect(result.current.isRestarted).toBe(false);
    expect(result.current.dinoBehavier).toStrictEqual({
      startPos: 0,
      direction: 'right',
      animation: 'walking',
      state: 'walk',
    });
    expect(result.current.serving).toBe(false);
    expect(result.current.splitting).toBe(false);
    expect(result.current.color).toBe('green');
    expect(result.current.visiblity).toBe('visible');
  });

  test('それぞれの状態を更新できる', () => {
    const { result } = renderHook(() => usePageStore());

    // setDinoStatusを実行するとdinoStatusの状態が更新される
    expect(result.current.dinoStatus).toBe(null);
    act(() =>
      result.current.setDinoStatus({
        color: 'blue',
        kind: 'brachio',
        level: 2,
        loop: 1,
        exp: 100,
      })
    );
    expect(result.current.dinoStatus).toStrictEqual({
      color: 'blue',
      kind: 'brachio',
      level: 2,
      loop: 1,
      exp: 100,
    });

    // setIsRestartedを実行するとisRestartedの状態が更新される
    expect(result.current.isRestarted).toBe(false);
    act(() => result.current.setIsRestarted(true));
    expect(result.current.isRestarted).toBe(true);

    // setDinoBehavierを実行するとdinoBehavierの状態が更新される
    expect(result.current.dinoBehavier).toStrictEqual({
      startPos: 0,
      direction: 'right',
      animation: 'walking',
      state: 'walk',
    });
    // directionだけ変更
    act(() => result.current.setDinoBehavier({ direction: 'left' }));
    // directionの値だけ変更されている
    expect(result.current.dinoBehavier).toStrictEqual({
      startPos: 0,
      direction: 'left',
      animation: 'walking',
      state: 'walk',
    });

    // setServingを実行するとservingの状態が更新される
    expect(result.current.serving).toBe(false);
    act(() => result.current.setServing(true));
    expect(result.current.serving).toBe(true);

    // setSplittingを実行するとsplittingの状態が更新される
    expect(result.current.splitting).toBe(false);
    act(() => result.current.setSplitting(true));
    expect(result.current.splitting).toBe(true);

    // setColorを実行するとcolorの状態が更新される
    expect(result.current.color).toBe('green');
    act(() => result.current.setColor('pink'));
    expect(result.current.color).toBe('pink');

    // setVisiblityを実行するとvisiblityの状態が更新される
    expect(result.current.visiblity).toBe('visible');
    act(() => result.current.setVisiblity('hidden'));
    expect(result.current.visiblity).toBe('hidden');
  });
});
