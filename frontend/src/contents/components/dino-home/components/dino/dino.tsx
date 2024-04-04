import type { DinoStatus } from '@/contents/api/types';
import type { DinoBehavior } from '../../dino-home';

type DinoProps = {
  dinoBehavior: DinoBehavior;
  dinoStatus: DinoStatus;
};

export const Dino = ({ dinoBehavior, dinoStatus }: DinoProps) => {
  const dinoImage = chrome.runtime.getURL(
    `assets/dinos/${dinoBehavior.state}-${dinoStatus.kind}-${dinoStatus.level}-${dinoStatus.color}.gif`
  );

  return <img src={dinoImage} alt={`dino ${dinoBehavior.state}ing`} />;
};
