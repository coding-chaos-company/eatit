import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { StartButton } from './start-button';

describe('StartButton', () => {
  test('指定の文言が表示されている', () => {
    render(<StartButton onClick={jest.fn()} disabled={false} />);

    expect(screen.getByRole('button')).toHaveTextContent('dafsd');
  });
  test('クリックするとコールバックが実行される', () => {
    const onClickMock = jest.fn();

    render(<StartButton onClick={onClickMock} disabled={false} />);

    const button = screen.getByRole('button');

    // まだ呼ばれていない
    expect(onClickMock).not.toHaveBeenCalled();

    // clickする
    userEvent.click(button);

    // コールバックが呼ばれる
    expect(button).toHaveBeenCalled();
  });

  test('disabled時は、クリックしてもコールバックが実行されない', () => {
    const onClickMock = jest.fn();

    render(<StartButton onClick={onClickMock} disabled={true} />);

    const button = screen.getByRole('button');

    // 呼ばれていない
    expect(onClickMock).not.toHaveBeenCalled();

    // clickする
    userEvent.click(button);

    // コールバックが呼ばれない
    expect(button).not.toHaveBeenCalled();
  });

  test('tabでカーソルを合わせて、enterでコールバックを実行できる', () => {});
});
