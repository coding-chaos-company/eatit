import { render, screen } from '@testing-library/react';
import { Container } from './container';

describe('Container', () => {
  test('表示確認', () => {
    render(<Container>Sample</Container>);

    // 渡した要素が描画される
    expect(screen.getByTestId('container')).toHaveTextContent('Sample');

    // 柵にaltが設定されている
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'fence');
  });
});
