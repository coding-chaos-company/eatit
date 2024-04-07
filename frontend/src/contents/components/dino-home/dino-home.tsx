import { usePageStore } from '@/contents/store/use-page-store';
import { type CSSProperties, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Loading } from '../loading';
import { Dino, Feed, FeedBowl, FeedButton } from './components';
import * as styles from './dino-home.module.css';
import { useDinoHomeHandler } from './hooks/use-dino-home-handler';

export type DinoBehavior = {
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
  const store = usePageStore(
    useShallow((state) => ({
      serving: state.serving,
      dinoBehavior: state.dinoBehavior,
      dinoStatus: state.dinoStatus,
      visibility: state.visibility,
      restartAnimation: state.restartAnimation,
      stopAnimation: state.stopAnimation,
      setServing: state.setServing,
      setDinoBehavior: state.setDinoBehavior,
      setDinoStatus: state.setDinoStatus,
      setVisibility: state.setVisibility,
    }))
  );
  const { serving, dinoBehavior, dinoStatus, visibility, restartAnimation, stopAnimation } = store;

  /**
   * Handlers
   */
  const { handleClickFeedButton, handleDinoAnimationIteration } = useDinoHomeHandler(
    { areaRef, dinoRef, direction: dinoBehavior.direction },
    store
  );

  /**
   * Life Cycle
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopAnimation();
      } else if (document.visibilityState === 'visible') {
        restartAnimation();
      }
    };

    const handleFocus = () => {
      restartAnimation();
    };

    const handleBlur = () => {
      stopAnimation();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('focus', handleFocus);
    document.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('focus', handleFocus);
      document.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div ref={areaRef} data-testid="DinoHome" className={styles.area}>
      {visibility === 'hidden' ? (
        <Loading />
      ) : (
        <>
          <div
            ref={dinoRef}
            className={`${styles.dino} ${styles[dinoBehavior.animation]}`}
            onAnimationIteration={handleDinoAnimationIteration}
            style={{
              left: dinoBehavior.startPos,
              transform: dinoBehavior.direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
            }}
          >
            <Dino dinoBehavior={dinoBehavior} dinoStatus={dinoStatus} />
          </div>
          <div className={styles.bowl}>
            <FeedBowl exp={dinoStatus.exp} />
          </div>
          <div className={serving ? styles.feed : styles.hidden}>
            <Feed />
          </div>

          <FeedButton onClick={handleClickFeedButton} disabled={serving} />
        </>
      )}
    </div>
  );
};
