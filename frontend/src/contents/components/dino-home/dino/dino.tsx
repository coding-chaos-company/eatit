import {
  type AnimationEventHandler,
  type CSSProperties,
  type ComponentPropsWithRef,
  type RefObject,
  forwardRef,
} from 'react';
import * as styles from './dino.module.css';

export type DinoType = {
  state: 'walk' | 'bend' | 'eat';
  kind: 'brachio';
  level: 1 | 2 | 3 | 4;
  color: 'green';
  direction: 'left' | 'right';
};

export type DinoAnimationType = 'walking' | 'toWalking' | 'toBowl' | 'stop';

type DinoProps = ComponentPropsWithRef<'img'> &
  DinoType & {
    animation: DinoAnimationType;
    initialPos: CSSProperties['left'];
  };

export const Dino = forwardRef<HTMLImageElement, DinoProps>(
  ({ state, kind, level, color, direction, animation, initialPos, onAnimationIteration }, ref) => {
    const dinoImage = chrome.runtime.getURL(
      `assets/dino/${state}-${kind}-${level}-${color}.gif`
    );

    return (
      <img
        ref={ref}
        className={`${styles.dino} ${styles[animation]}`}
        src={dinoImage}
        alt="dino walking"
        style={{
          left: initialPos,
          transform: direction === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
        }}
        onAnimationIteration={onAnimationIteration}
      />
    );
  }
);

Dino.displayName = 'Dino';
