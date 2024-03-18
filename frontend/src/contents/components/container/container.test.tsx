import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Container } from './container';

describe('Container', () => {
  test('表示確認', () => {
    render(<Container>Sample</Container>);

    // 柵が表示される
    const fence = screen.getByRole('img');
    // altが設定されている
    expect(fence).toHaveAttribute('alt', 'fence');
    // fence.pngを取得している
    expect(chrome.runtime.getURL).toHaveBeenCalledWith('assets/fence.png');
    // srcに取得したfence.pngが渡されている
    expect(fence).toHaveAttribute('src', expect.stringMatching(/assets\/fence.png$/));
  });

  test('渡した要素が描画される', () => {
    render(<Container>Sample</Container>);
    expect(screen.getByTestId('container')).toHaveTextContent('Sample');
  });
});
