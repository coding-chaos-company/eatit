import { usePageStore } from '@/contents/store/use-page-store';
import { type CSSProperties, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Loading } from '../loading';
import { Dino, Feed, FeedBowl, FeedButton } from './components';
import * as styles from './dino-home.module.css';
import { useDinoHomeHandler } from './hooks/use-dino-home-handler';

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
  const store = usePageStore(
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
  const { serving, dinoBehavier, dinoStatus, visiblity, setDinoBehavier, setVisiblity } = store;

  /**
   * Handlers
   */
  const { handleClickFeedButton, handleDinoAnimationIteration } = useDinoHomeHandler(
    { areaRef, dinoRef, direction: dinoBehavier.direction },
    store
  );

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
            onAnimationIteration={handleDinoAnimationIteration}
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

          <FeedButton onClick={handleClickFeedButton} disabled={serving} />
        </>
      )}
    </div>
  );
};
