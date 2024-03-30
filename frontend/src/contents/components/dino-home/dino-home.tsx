import * as feedAPI from '@/contents/api/feed';
import type { DinoStatus } from '@/contents/api/types';
import { usePageStore } from '@/contents/store/use-page-store';
import { getCurrentDinoPosition, getUserName, wait } from '@/contents/utils';
import {
  type AnimationEventHandler,
  type CSSProperties,
  type MouseEventHandler,
  useEffect,
  useRef,
} from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Loading } from '../loading';
import { Dino, Feed, FeedBowl, FeedButton } from './components';
import * as styles from './dino-home.module.css';

export type DinoBehavier = {
  startPos: CSSProperties['left']; // アニメーションの開始位置
  direction: 'left' | 'right';
  animation: 'walking' | 'toWalking' | 'toBowl' | 'stop';
  state: 'eat' | 'bend' | 'walk';
};

export const DinoHome = () => {
  /**
   * RefObjects
   * 親要素からの相対位置を取得するため2つ定義する
   */
  const areaRef = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLImageElement>(null);

  /**
   * States
   */
  const {
    serving,
    dinoBehavier,
    dinoStatus,
    visiblity,
    setServing,
    setDinoBehavier,
    setDinoStatus,
    setVisiblity,
  } = usePageStore(
    useShallow((state) => ({
      serving: state.serving,
      dinoBehavier: state.dinoBehavier,
      dinoStatus: state.dinoStatus,
      visiblity: state.visiblity,
      setServing: state.setServing,
      setDinoBehavier: state.setDinoBehavier,
      setDinoStatus: state.setDinoStatus,
      setVisiblity: state.setVisiblity,
    }))
  );

  /**
   * Handlers
   */
  const onFeedButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    // ご飯を落とす
    setServing(true);

    setDinoBehavier({
      startPos: getCurrentDinoPosition(areaRef, dinoRef),
      direction: 'right',
      animation: 'toBowl',
    });
  };

  const onDinoAnimationIterationHandler: AnimationEventHandler<HTMLImageElement> = async (e) => {
    if (e.animationName.endsWith('walking')) {
      setDinoBehavier(
        dinoBehavier.direction === 'right' ? { direction: 'left' } : { direction: 'right' }
      );
    }

    if (e.animationName.endsWith('toBowl')) {
      // animationを止めて、bend状態にする
      setDinoBehavier({
        startPos: 'calc(100% - 160px)',
        animation: 'stop',
        state: 'bend',
      });

      try {
        // bendのgifアニメーションを待つ
        await wait(1790);

        // eatアニメーションを流す
        setDinoBehavier({ state: 'eat' });

        // 3秒ご飯食べるのを待つ
        await wait(3000);

        // requestを送る前にご飯食べるのやめる
        setDinoBehavier({ animation: 'toWalking', direction: 'left', state: 'walk' });
        setServing(false);

        const res = await feedAPI.put({ github_name: getUserName() });
        setDinoStatus(res.status);
      } catch {
        /** エラーハンドリング */
      }
    }

    if (e.animationName.endsWith('toWalking')) {
      setDinoBehavier({ animation: 'walking', direction: 'right', startPos: 0 });
    }
  };

  /**
   * Life Cycle
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setVisiblity('hidden');
        setDinoBehavier({
          animation: 'stop',
        });
      } else if (document.visibilityState === 'visible') {
        setDinoBehavier({
          startPos: 0,
          direction: 'right',
          animation: 'walking',
          state: 'walk',
        });
        setVisiblity('visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div ref={areaRef} data-testid="DinoHome" className={styles.area}>
      {visiblity === 'hidden' ? (
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
