import { FeedBowl } from './feed-bowl/feed-bowl';
import * as styles from './saurus-area.module.css';
import { WalkSaurus } from './walk-saurus/walk-saurus';

type SaurusAreaProps = {
  isMe: boolean;
};

export const SaurusArea = ({ isMe }: SaurusAreaProps) => {
  console.log(isMe);

  return (
    <div className={styles.area} data-testid="SaurusArea">
      <WalkSaurus />
      <FeedBowl isFull />
    </div>
  );
};
