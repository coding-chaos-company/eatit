import { render, screen } from '@testing-library/react';
import { Grass } from './grass';

describe('Grass', () => {
  test('表示確認', () => {
    render(<Grass level={1} />);

    // levelが表示されている
    expect(screen.getByTestId('tooltip')).toHaveTextContent(
      'Translated<dinoHome_grass_tooltip> : 1'
    );
  });
});
