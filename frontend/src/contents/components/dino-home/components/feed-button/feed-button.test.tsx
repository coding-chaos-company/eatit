import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { FeedButton } from './feed-button';

describe('FeedButton', () => {
  test('表示確認', () => {
    render(<FeedButton onClick={jest.fn()} disabled={false} />);

    const button = screen.getByRole('button');

    // 指定の文言が表示されている
    expect(button).toHaveTextContent('dinoSelection_feedButton');

    expect(button).toHaveAttribute('type', 'button');
  });

  test('クリックするとコールバックが実行される', async () => {
    const handleClick = jest.fn();

    render(<FeedButton onClick={handleClick} disabled={false} />);

    const button = screen.getByRole('button');

    // まだ呼ばれていない
    expect(handleClick).not.toHaveBeenCalled();

    // clickする
    await userEvent.click(button);

    // コールバックが呼ばれる
    expect(handleClick).toHaveBeenCalled();
  });

  test('disabled時は、クリックしてもコールバックが実行されない', async () => {
    const handleClick = jest.fn();

    render(<FeedButton onClick={handleClick} disabled={true} />);

    const button = screen.getByRole('button');

    // 呼ばれていない
    expect(handleClick).not.toHaveBeenCalled();

    // clickする
    await userEvent.click(button);

    // コールバックが呼ばれない
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('tabでカーソルを合わせて、enterでコールバックを実行できる', async () => {
    const handleClick = jest.fn();

    render(<FeedButton onClick={handleClick} disabled={false} />);

    const button = screen.getByRole('button');

    // 呼ばれていない
    expect(handleClick).not.toHaveBeenCalled();

    // tabキーを押す
    await userEvent.tab();

    // buttonにフォーカスが当たっている
    expect(button).toHaveFocus();

    // enterキーを押す
    await userEvent.keyboard('{Enter}');

    // コールバックが呼ばれる
    expect(handleClick).toHaveBeenCalled();
  });
});
