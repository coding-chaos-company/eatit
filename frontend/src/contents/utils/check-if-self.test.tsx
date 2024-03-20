import { render } from '@testing-library/react';
import { checkIfSelf } from './check-if-self';

describe('checkIfSelf', () => {
  test('Contribution Settingsがある時、trueが返る', async () => {
    render(<summary className="pinned-items-setting-link">Contribution Settings</summary>);

    expect(checkIfSelf()).toBe(true);
  });

  test('Contribution Settingsがない時、falseが返る', async () => {
    render(<div>sample</div>);

    expect(checkIfSelf()).toBe(false);
  });
});
