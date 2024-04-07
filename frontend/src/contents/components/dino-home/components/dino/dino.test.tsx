import { render, screen } from '@testing-library/react';
import { Dino } from './dino';

describe('Dino', () => {
  test('表示確認', () => {
    const behavior = {
      startPos: 0,
      direction: 'right',
      state: 'walk',
      animation: 'walking',
    } as const;
    const status = { color: 'green', kind: 'brachio', level: 1, loop: 1, exp: 1 } as const;

    render(<Dino dinoBehavior={behavior} dinoStatus={status} />);

    // 状態に応じたaltが付与される
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'dino walking');
  });
});
