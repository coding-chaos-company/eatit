import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Feed } from './feed';

describe('Feed', () => {
  test('表示確認', () => {
    render(<Feed />);

    // altが付与されている
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'feed');
  });
});
