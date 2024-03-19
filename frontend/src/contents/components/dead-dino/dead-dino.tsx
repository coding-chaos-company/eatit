import deathBrachioImage from 'data-base64:~/../assets/death-brachio.png';
import type { MouseEventHandler } from 'react';
import * as styles from './dead-dino.module.css';

type DeadDinoProps = {
  onClick: MouseEventHandler;
};

export const DeadDino = ({ onClick }: DeadDinoProps) => {
  return (
    <div className={styles.deadDino}>
      <img className={styles.img} src={deathBrachioImage} alt="dead dino" />
      <button className={styles.button} type="button" onClick={onClick}>
        {chrome.i18n.getMessage('deadDino_reStartButton')}
      </button>
    </div>
  );
};
