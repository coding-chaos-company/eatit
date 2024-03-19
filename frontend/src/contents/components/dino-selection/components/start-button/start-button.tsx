import type { MouseEventHandler } from 'react';
import * as styles from './start-button.module.css';

type StartButtonProps = {
  disabled: boolean;
  onClick: MouseEventHandler;
};

export const StartButton = ({ disabled, onClick }: StartButtonProps) => {
  return (
    <button className={styles.button} type="button" onClick={onClick} disabled={disabled}>
      {chrome.i18n.getMessage('dinoHome_startButton')}
    </button>
  );
};
