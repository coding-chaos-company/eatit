import type { DinoStatus } from '@/contents/api/types';
import {
  type AnimationEventHandler,
  type CSSProperties,
  type MouseEventHandler,
  useRef,
  useState,
} from 'react';
import * as styles from './dino-home.module.css';
import { Dino } from './dino/dino';
import { FeedBowl } from './feed-bowl/feed-bowl';
import { FeedButton } from './feed-button/feed-button';
import { Feed } from './feed/feed';

type DinoHomeProps = {
  isMe: boolean;
  dinoStatus: DinoStatus;
  handleChangeDinoStatus: (status: DinoStatus) => void;
};

export type DinoBehavier = {
  pos: CSSProperties['left'];
  direction: 'left' | 'right';
  animation: 'walking' | 'toWalking' | 'toBowl' | 'stop';
  state: 'eat' | 'bend' | 'walk';
};

export const DinoHome = ({ dinoStatus }: DinoHomeProps) => {
  /**
   * RefObjects
   * 親要素からの相対位置を取得するため2つ定義する
   */
  const areaRef = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLImageElement>(null);

  /**
   * States
   */
  const [dinoBehavier, setDinoBehavier] = useState<DinoBehavier>({
    pos: 0,
    direction: 'right',
    animation: 'walking',
    state: 'walk',
  });
  const [isFull, _setIsFull] = useState(true);
  const [disabled, _setIsDisabled] = useState(false);

  /**
   * Handlers
   */
  const handleChangeDinoAnimation = (dinoBehavier: Partial<DinoBehavier>) => {
    setDinoBehavier((prev) => ({ ...prev, ...dinoBehavier }));
  };

  const onFeedButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const absolutePos =
      dinoRef.current.getBoundingClientRect().left - areaRef.current.getBoundingClientRect().left;

    handleChangeDinoAnimation({ pos: absolutePos, direction: 'right', animation: 'toBowl' });
  };

  const onDinoAnimationIterationHandler: AnimationEventHandler<HTMLImageElement> = (e) => {
    if (e.animationName.endsWith('walking')) {
      handleChangeDinoAnimation(
        dinoBehavier.direction === 'right' ? { direction: 'left' } : { direction: 'right' }
      );
    }

    if (e.animationName.endsWith('toBowl')) {
      handleChangeDinoAnimation({ pos: 'calc(100% - 160px)', animation: 'stop', state: 'eat' });
    }
  };

  return (
    <div ref={areaRef} data-testid="DinoHome" className={styles.area}>
      <div
        ref={dinoRef}
        className={`${styles.dino} ${styles[dinoBehavier.animation]}`}
        onAnimationIteration={onDinoAnimationIterationHandler}
        style={{
          left: dinoBehavier.pos,
          transform: dinoBehavier.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      >
        <Dino dinoBehavier={dinoBehavier} dinoStatus={dinoStatus} />
      </div>
      <div className={styles.bowl}>
        <FeedBowl isFull={isFull} />
      </div>
      <div className={styles.feed}>
        <Feed />
      </div>

      <FeedButton onClick={onFeedButtonClickHandler} disabled={disabled} />
    </div>
  );
};
