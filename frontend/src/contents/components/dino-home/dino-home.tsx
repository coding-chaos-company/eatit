import {
  type AnimationEventHandler,
  type CSSProperties,
  type MouseEventHandler,
  useRef,
  useState,
} from 'react';
import * as styles from './dino-home.module.css';
import { Dino, type DinoAnimationType, type DinoType } from './dino/dino';
import { FeedBowl } from './feed-bowl/feed-bowl';
import { Feed } from './feed/feed';

type DinoHomeProps = {
  isMe: boolean;
};

export const DinoHome = ({}: DinoHomeProps) => {
  /**
   * RefObjects
   * 親要素からの相対位置を取得するため2つ定義する
   */
  const areaRef = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLImageElement>(null);

  /**
   * States
   */
  const [initialPos, setInitialPos] = useState<CSSProperties['left']>(0);
  const [dinoState, setDinoState] = useState<DinoType>({
    state: 'walk',
    level: 1,
    kind: 'brachio',
    color: 'green',
    direction: 'right',
  });
  const [animationClass, setAnimationClass] = useState<DinoAnimationType>('walking');

  /**
   * Handlers
   */
  const _onFeedButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const absolutePos =
      dinoRef.current.getBoundingClientRect().left - areaRef.current.getBoundingClientRect().left;

    setAnimationClass('toBowl');
    setDinoState((prev) => ({ ...prev, direction: 'right' }));
    setInitialPos(absolutePos);
  };
  const onDinoAnimationIterationHandler: AnimationEventHandler<HTMLImageElement> = (e) => {
    if (e.animationName.endsWith('walking')) {
      setDinoState((prev) => ({
        ...prev,
        direction: prev.direction === 'left' ? 'right' : 'left',
      }));
    }

    if (e.animationName.endsWith('toBowl')) {
      setInitialPos('calc(100% - 160px)');
      setAnimationClass('stop');
      setDinoState((prev) => ({ ...prev, state: 'eat' }));
    }
  };

  return (
    <div ref={areaRef} data-testid="DinoHome">
      <Dino
        ref={dinoRef}
        initialPos={initialPos}
        animation={animationClass}
        onAnimationIteration={onDinoAnimationIterationHandler}
        {...dinoState}
      />
      <FeedBowl isFull />
      <Feed />
    </div>
  );
};
