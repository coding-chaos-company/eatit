import bowlFull from 'data-base64:~/../assets/bowl-full.png';
import bowl from 'data-base64:~/../assets/bowl.png';

type FeedBowlProps = {
  isFull: boolean;
};

export const FeedBowl = ({ isFull }: FeedBowlProps) => {
  return <>{isFull ? <img src={bowlFull} alt="bowl" /> : <img src={bowl} alt="bowl full" />}</>;
};
