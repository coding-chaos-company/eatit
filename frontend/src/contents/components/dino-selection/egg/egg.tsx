import egg from 'data-base64:~/../assets/egg.gif';
import * as styles from './egg.module.css';

export const Egg = () => {
  return <img src={egg} alt="egg" className={styles.egg} />;
};
