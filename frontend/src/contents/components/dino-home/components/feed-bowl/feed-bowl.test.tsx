import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FeedBowl } from './feed-bowl';

describe('FeedBowl', () => {
  test('表示確認', () => {
    render(<FeedBowl />);

    // altが付与されている
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'feed bowl');
  });
});
