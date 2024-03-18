import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Egg } from './egg';

describe('Egg', () => {
  test('colorに応じたaltが付与される', () => {
    render(<Egg color="green" />);

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'green egg');
  });

  test('colorに応じたgifファイルを表示する', () => {
    render(<Egg color="green" />);

    expect(chrome.runtime.getURL).toHaveBeenCalledWith('assets/eggs/egg-green.gif');
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/assets\/eggs\/egg-green.gif$/)
    );
  });
});
