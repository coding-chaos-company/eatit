import grass from 'data-base64:~/../assets/grass.gif';
import type { DinoStatus } from '@/contents/api/types';
import * as styles from './grass.module.css';

type GrassProps = {
  level?: DinoStatus['level'];
};

export const Grass = ({ level }: GrassProps) => {
  return (
    <div className={styles.grass}>
      <img className={styles.img} src={grass} alt="grass" />
      <img src={grass} alt="grass2" />
      <img className={styles.img3} src={grass} alt="grass3" />
      {level && (
        <span className={styles.tooltip} data-testid="tooltip">
          <span className={styles.text}>
            {chrome.i18n.getMessage('dinoHome_grass_tooltip')} : {level}
          </span>
        </span>
      )}
    </div>
  );
};
