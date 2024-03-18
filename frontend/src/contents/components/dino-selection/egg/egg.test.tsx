import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Egg } from './egg';

describe('Egg', () => {
  test('表示確認', () => {
    render(<Egg color="green" />);

    // colorに応じたaltが付与される
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'green egg');

    // colorに応じたgifファイルを表示する
    expect(chrome.runtime.getURL).toHaveBeenCalledWith('assets/eggs/egg-green.gif');
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringMatching(/assets\/eggs\/egg-green.gif$/)
    );
  });
});
