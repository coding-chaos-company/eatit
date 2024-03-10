import * as styles from './saurus-area.module.css';
import { WalkSaurus } from './walk-saurus/walk-saurus';

export const SaurusArea = () => {
  return (
    <div className={styles.area} data-testid="SaurusArea">
      <WalkSaurus />
    </div>
  );
};
