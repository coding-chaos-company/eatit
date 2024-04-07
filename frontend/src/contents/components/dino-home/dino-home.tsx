import { usePageStore } from '@/contents/store/use-page-store';
import { type CSSProperties, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Loading } from '../loading';
import { Dino, Feed, FeedBowl, FeedButton, Grass } from './components';
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
      setServing: state.setServing,
      setDinoBehavior: state.setDinoBehavior,
      setDinoStatus: state.setDinoStatus,
      setVisibility: state.setVisibility,
    }))
  );
  const { serving, dinoBehavior, dinoStatus, visibility, setDinoBehavior, setVisibility } = store;

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
        setVisibility('hidden');
        setDinoBehavior({
          animation: 'stop',
        });
      } else if (document.visibilityState === 'visible') {
        setDinoBehavior({
          startPos: 0,
          direction: 'right',
          animation: 'walking',
          state: 'walk',
        });
        setVisibility('visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
          <div className={styles.grasses}>
            <Grass level={dinoStatus.level} />
          </div>
          {/* TODO：今後オブジェクトを追加する際に置き換える */}
          <div className={styles.grasses2}>
            <Grass />
          </div>
          <div className={styles.grasses3}>
            <Grass />
          </div>

          <FeedButton onClick={handleClickFeedButton} disabled={serving} />
        </>
      )}
    </div>
  );
};
