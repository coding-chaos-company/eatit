import type { DinoStatus } from '@/contents/api/types';

type EggProps = {
  color: DinoStatus['color'];
};

export const Egg = ({ color }: EggProps) => {
  const eggImage = chrome.runtime.getURL(`assets/eggs/egg-${color}.gif`);
  return <img src={eggImage} alt="egg" />;
};
