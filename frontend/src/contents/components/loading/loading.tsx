import loadingImage from 'data-base64:~/../assets/loading.gif';
import * as styles from './loading.module.css';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingImage} alt="loading" />
    </div>
  );
};
