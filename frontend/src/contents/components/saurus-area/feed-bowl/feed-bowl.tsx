import bowlFull from 'data-base64:~/../assets/bowl-full.png';
import bowl from 'data-base64:~/../assets/bowl.png';
import * as styles from './feed-bowl.module.css';

type FeedBowlProps = {
  isFull: boolean;
};

export const FeedBowl = ({ isFull }: FeedBowlProps) => {
  return (
    <>
      {isFull ? (
        <img className={styles.bowl} src={bowlFull} alt="bowl" />
      ) : (
        <img className={styles.bowl} src={bowl} alt="bowl full" />
      )}
    </>
  );
};
