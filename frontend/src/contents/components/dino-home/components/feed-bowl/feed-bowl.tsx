import bowl from 'data-base64:~/../assets/bowl.png';
import type { DinoStatus } from '@/contents/api/types';
import * as styles from './feed-bowl.module.css';

type FeedBowlProps = {
  exp: DinoStatus['exp'];
};

export const FeedBowl = ({ exp }: FeedBowlProps) => {
  return (
    <div className={styles.feedBowl}>
      <img className={styles.img} src={bowl} alt="feed bowl" />
      <span className={styles.tooltip} data-testid="tooltip">
        <span className={styles.text}>
          {chrome.i18n.getMessage('dinoHome_feedBowl_tooltip')} : {exp}
        </span>
      </span>
    </div>
  );
};
