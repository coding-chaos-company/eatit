import * as feedAPI from '@/contents/api/feed';
import type { DinoStatus } from '@/contents/api/types';
import { getCurrentDinoPosition, getUserName, wait } from '@/contents/utils';
import {
  type AnimationEventHandler,
  type CSSProperties,
  type MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Loading } from '../loading';
import { Dino, Feed, FeedBowl, FeedButton } from './components';
import * as styles from './dino-home.module.css';

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
  const areaRef = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLImageElement>(null);

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
  const [hidden, setHidden] = useState(false);

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
      // animationを止めて、bend状態にする
      handleChangeDinoBehavier({
        startPos: 'calc(100% - 160px)',
        animation: 'stop',
        state: 'bend',
      });

      try {
        // bendのgifアニメーションを待つ
        await wait(1790);

        // eatアニメーションを流す
        handleChangeDinoBehavier({ state: 'eat' });

        // 3秒ご飯食べるのを待つ
        await wait(3000);

        // requestを送る前にご飯食べるのやめる
        handleChangeDinoBehavier({ animation: 'toWalking', direction: 'left', state: 'walk' });
        setServing(false);

        const res = await feedAPI.put({ github_name: getUserName() });
        handleChangeDinoStatus(res.status);
      } catch {
        /** エラーハンドリング */
      }
    }

    if (e.animationName.endsWith('toWalking')) {
      handleChangeDinoBehavier({ animation: 'walking', direction: 'right', startPos: 0 });
    }
  };

  /**
   * Life Cycle
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setHidden(true);
        handleChangeDinoBehavier({
          animation: 'stop',
        });
      } else if (document.visibilityState === 'visible') {
        setHidden(false);
        handleChangeDinoBehavier({
          startPos: 0,
          direction: dinoBehavier.direction,
          animation: 'walking',
          state: 'walk',
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={areaRef} data-testid="DinoHome" className={styles.area}>
      {hidden ? (
        <Loading />
      ) : (
        <>
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
            <FeedBowl exp={dinoStatus.exp} />
          </div>
          <div className={serving ? styles.feed : styles.hidden}>
            <Feed />
          </div>

          <FeedButton onClick={onFeedButtonClickHandler} disabled={serving} />
        </>
      )}
    </div>
  );
};
