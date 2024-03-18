import { render, screen } from '@testing-library/react';
import { Container } from './container';

describe('Container', () => {
  test('渡した要素が描画される', () => {
    render(<Container>Sample</Container>);
    expect(screen.getByTestId('DinoHome')).toHaveTextContent('Sample');
  });
});
