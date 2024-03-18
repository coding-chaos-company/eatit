import startImage from 'data-base64:~/../assets/start-button.png';
import type { MouseEventHandler } from 'react';
import * as styles from './start-button.module.css';

type StartButtonProps = {
  disabled: boolean;
  onClick: MouseEventHandler;
};

export const StartButton = ({ disabled, onClick }: StartButtonProps) => {
  return (
    <button className={styles.button} type="button" onClick={onClick} disabled={disabled}>
      <img src={startImage} alt="start" />
    </button>
  );
};
