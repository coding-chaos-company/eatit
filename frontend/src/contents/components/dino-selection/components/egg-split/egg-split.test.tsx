import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EggSplit } from './egg-split';

describe('SplitEgg', () => {
  test('表示確認', () => {
    render(<EggSplit color="green" />);

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
