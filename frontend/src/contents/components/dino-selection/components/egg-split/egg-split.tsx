import type { DinoStatus } from '@/contents/api/types';
import * as styles from './egg-split.module.css';

type EggSplitProps = {
  color: DinoStatus['color'];
};

export const EggSplit = ({ color }: EggSplitProps) => {
  const eggImage = chrome.runtime.getURL(`assets/eggs/egg-split-${color}.gif`);
  return <img className={styles.img} src={eggImage} alt={`${color} egg split`} />;
};
