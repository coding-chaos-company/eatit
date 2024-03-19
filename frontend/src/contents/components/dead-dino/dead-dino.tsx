import deathBrachioImage from 'data-base64:~/../assets/death-brachio.png';
import * as styles from './dead-dino.module.css';

export const DeadDino = () => {
  return (
    <div className={styles.deadDino}>
      <img className={styles.img} src={deathBrachioImage} alt="dead dino" />
    </div>
  );
};
