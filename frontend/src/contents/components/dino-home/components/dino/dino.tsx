import type { DinoStatus } from '@/contents/api/types';
import type { DinoBehavier } from '../../dino-home';

type DinoProps = {
  dinoBehavier: DinoBehavier;
  dinoStatus: DinoStatus;
};

export const Dino = ({ dinoBehavier, dinoStatus }: DinoProps) => {
  const dinoImage = chrome.runtime.getURL(
    `assets/dinos/${dinoBehavier.state}-${dinoStatus.kind}-${dinoStatus.level}-${dinoStatus.color}.gif`
  );

  return <img src={dinoImage} alt={`dino ${dinoBehavier.state}ing`} />;
};
