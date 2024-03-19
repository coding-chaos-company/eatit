import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Dino } from './dino';

describe('Dino', () => {
  test('表示確認', () => {
    const behavier = {
      startPos: 0,
      direction: 'right',
      state: 'walk',
      animation: 'walking',
    } as const;
    const status = { color: 'green', kind: 'brachio', level: 1, loop: 1, exp: 1 } as const;

    render(<Dino dinoBehavier={behavier} dinoStatus={status} />);

    // 状態に応じたgif画像を表示する
    expect(chrome.runtime.getURL).toHaveBeenCalledWith('assets/dinos/walk-brachio-1-green.gif');
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/assets\/dinos\/walk-brachio-1-green.gif$/)
    );

    // 状態に応じたaltが付与される
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'dino walking');
  });
});
