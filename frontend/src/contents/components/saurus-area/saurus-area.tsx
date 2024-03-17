import startButton from 'data-base64:~/../assets/start-button.png';
import {
  type AnimationEventHandler,
  type CSSProperties,
  type MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { FeedBowl } from './feed-bowl/feed-bowl';
import { Feed } from './feed/feed';
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
  const [saurusState, setSaurusState] = useState<SaurusType>({
    state: 'walk',
    level: 1,
    kind: 'brachio',
    color: 'green',
    direction: 'right',
  });
  const [animationClass, setAnimationClass] = useState<SaurusAnimationType>('walking');

  /**
   * Handlers
   */
  const onFeedButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const absolutePos =
      saurusRef.current.getBoundingClientRect().left - areaRef.current.getBoundingClientRect().left;

    setAnimationClass('toBowl');
    setSaurusState((prev) => ({ ...prev, direction: 'right' }));
    setInitialPos(absolutePos);
  };
  const onSaurusAnimationIterationHandler: AnimationEventHandler<HTMLImageElement> = (e) => {
    if (e.animationName.endsWith('walking')) {
      setSaurusState((prev) => ({
        ...prev,
        direction: prev.direction === 'left' ? 'right' : 'left',
      }));
    }

    if (e.animationName.endsWith('toBowl')) {
      setInitialPos('calc(100% - 160px)');
      setAnimationClass('stop');
      setSaurusState((prev) => ({ ...prev, state: 'eat' }));
    }
  };

  return (
    <div ref={areaRef} data-testid="SaurusArea">
      <Saurus
        ref={saurusRef}
        initialPos={initialPos}
        animation={animationClass}
        onAnimationIteration={onSaurusAnimationIterationHandler}
        {...saurusState}
      />

      <button
        className={styles.startButton}
        type="button"
        onClick={onFeedButtonClickHandler}
        disabled={animationClass !== 'walking'}
      >
        <img src={startButton} alt="start" />
      </button>

      <FeedBowl isFull />
      <Feed />
    </div>
  );
};
