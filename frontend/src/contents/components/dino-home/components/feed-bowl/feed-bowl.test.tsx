import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FeedBowl } from './feed-bowl';

describe('FeedBowl', () => {
  test('表示確認', () => {
    render(<FeedBowl exp={1} />);

    // altが付与されている
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'feed bowl');
  });

  test.todo('expの表示確認');
});
