import type { DinoStatus } from '@/contents/api/types';
import { assets } from '@/contents/constants/assets';
import type { DinoBehavior } from '../../dino-home';

type DinoProps = {
  dinoBehavior: DinoBehavior;
  dinoStatus: DinoStatus;
};

export const Dino = ({ dinoBehavior, dinoStatus }: DinoProps) => {
  return (
    <img
      src={assets[dinoBehavior.state][dinoStatus.kind][dinoStatus.level][dinoStatus.color]}
      alt={`dino ${dinoBehavior.state}ing`}
    />
  );
};
