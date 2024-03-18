import * as feedAPI from '@/contents/api/feed';
import type { DinoStatus } from '@/contents/api/types';
import { getCurrentDinoPosition, getUserName, wait } from '@/contents/utils';
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
  startPos: CSSProperties['left']; // アニメーションの開始位置
  direction: 'left' | 'right';
  animation: 'walking' | 'toWalking' | 'toBowl' | 'stop';
  state: 'eat' | 'bend' | 'walk';
};

export const DinoHome = ({ dinoStatus, handleChangeDinoStatus }: DinoHomeProps) => {
  /**
   * RefObjects
   * 親要素からの相対位置を取得するため2つ定義する
   */
  const areaRef = useRef<HTMLDivElement | null>(null);
  const dinoRef = useRef<HTMLImageElement | null>(null);

  /**
   * States
   */
  const [dinoBehavier, setDinoBehavier] = useState<DinoBehavier>({
    startPos: 0,
    direction: 'right',
    animation: 'walking',
    state: 'walk',
  });
  const [serving, setServing] = useState(false);
  const [disabled, _setIsDisabled] = useState(false);

  /**
   * Handlers
   */
  const handleChangeDinoBehavier = (dinoBehavier: Partial<DinoBehavier>) => {
    setDinoBehavier((prev) => ({ ...prev, ...dinoBehavier }));
  };

  const onFeedButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    // ご飯を落とす
    setServing(true);

    handleChangeDinoBehavier({
      startPos: getCurrentDinoPosition(areaRef, dinoRef),
      direction: 'right',
      animation: 'toBowl',
    });
  };

  const onDinoAnimationIterationHandler: AnimationEventHandler<HTMLImageElement> = async (e) => {
    if (e.animationName.endsWith('walking')) {
      handleChangeDinoBehavier(
        dinoBehavier.direction === 'right' ? { direction: 'left' } : { direction: 'right' }
      );
    }

    if (e.animationName.endsWith('toBowl')) {
      // animationを止める
      handleChangeDinoBehavier({ startPos: 'calc(100% - 160px)', animation: 'stop', state: 'eat' });

      // 3秒ご飯食べるのを待つ
      await wait(3000);

      const res = await feedAPI.put({ github_name: getUserName() });

      setServing(false);
      handleChangeDinoStatus(res.status);
      handleChangeDinoBehavier({ animation: 'toWalking', direction: 'left', state: 'walk' });
    }

    if (e.animationName.endsWith('toWalking')) {
      handleChangeDinoBehavier({ animation: 'walking', direction: 'right', startPos: 0 });
    }
  };

  return (
    <div ref={areaRef} data-testid="DinoHome" className={styles.area}>
      <div
        ref={dinoRef}
        className={`${styles.dino} ${styles[dinoBehavier.animation]}`}
        onAnimationIteration={onDinoAnimationIterationHandler}
        style={{
          left: dinoBehavier.startPos,
          transform: dinoBehavier.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      >
        <Dino dinoBehavier={dinoBehavier} dinoStatus={dinoStatus} />
      </div>
      <div className={styles.bowl}>
        <FeedBowl />
      </div>
      <div className={serving ? styles.feed : styles.hidden}>
        <Feed />
      </div>

      <FeedButton onClick={onFeedButtonClickHandler} disabled={disabled} />
    </div>
  );
};
