import feed from 'data-base64:~/../assets/feed.png';
import * as styles from './feed.module.css';

export const Feed = () => {
  return <img src={feed} alt="feed" className={styles.feed} />;
};
