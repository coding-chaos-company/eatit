import {
  type AnimationEventHandler,
  type CSSProperties,
  type MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { FeedBowl } from './feed-bowl/feed-bowl';
import * as styles from './saurus-area.module.css';
import { Saurus, type SaurusAnimationType, type SaurusType } from './saurus/saurus';

type SaurusAreaProps = {
  isMe: boolean;
};

export const SaurusArea = ({}: SaurusAreaProps) => {
  /**
   * RefObjects
   * 親要素からの相対位置を取得するため2つ定義する
   */
  const areaRef = useRef<HTMLDivElement>(null);
  const saurusRef = useRef<HTMLImageElement>(null);

  /**
   * States
   */
  const [initialPos, setInitialPos] = useState<CSSProperties['left']>(0);
  const [saurusState, setSaurusState] = useState<
    Omit<SaurusType, 'animation' | 'initialPos' | 'onAnimationEnd'>
  >({
    state: 'walk',
    level: 1,
    kind: 'brachio',
    color: 'green',
  });
  const [animationClass, setAnimationClass] = useState<SaurusAnimationType>('walking');

  /**
   * Handlers
   */
  const onFeedButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const absolutePos =
      saurusRef.current.getBoundingClientRect().left - areaRef.current.getBoundingClientRect().left;

    setAnimationClass('toBowl');
    setInitialPos(absolutePos);
  };
  const onSaurusAnimationIterationHandler: AnimationEventHandler<HTMLImageElement> = (e) => {
    if (e.animationName.endsWith('toBowl')) {
      setInitialPos('80%');
      setAnimationClass('stop');
      setSaurusState((prev) => ({ ...prev, state: 'eat' }));
    }
  };

  return (
    <div ref={areaRef} className={styles.area} data-testid="SaurusArea">
      <Saurus
        ref={saurusRef}
        initialPos={initialPos}
        animation={animationClass}
        onAnimationIteration={onSaurusAnimationIterationHandler}
        {...saurusState}
      />

      <button
        type="button"
        onClick={onFeedButtonClickHandler}
        disabled={animationClass !== 'walking'}
      >
        えさをあげる
      </button>

      <FeedBowl isFull />
    </div>
  );
};
