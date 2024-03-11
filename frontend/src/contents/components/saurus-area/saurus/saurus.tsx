import {
  type AnimationEventHandler,
  type CSSProperties,
  type ComponentPropsWithRef,
  type RefObject,
  forwardRef,
} from 'react';
import * as styles from './saurus.module.css';

export type SaurusType = {
  state: 'walk' | 'bend' | 'eat';
  kind: 'brachio';
  level: 1 | 2 | 3 | 4;
  color: 'green';
};

export type SaurusAnimationType = 'walking' | 'toWalking' | 'toBowl' | 'stop';

type SaurusProps = ComponentPropsWithRef<'img'> &
  SaurusType & {
    animation: SaurusAnimationType;
    initialPos: CSSProperties['left'];
  };

export const Saurus = forwardRef<HTMLImageElement, SaurusProps>(
  ({ state, kind, level, color, animation, initialPos, onAnimationIteration }, ref) => {
    const saurusImage = chrome.runtime.getURL(
      `assets/saurus/${state}-${kind}-${level}-${color}.gif`
    );

    return (
      <img
        ref={ref}
        className={`${styles.saurus} ${styles[animation]}`}
        src={saurusImage}
        alt="saurus walking"
        style={{
          left: initialPos,
        }}
        onAnimationIteration={onAnimationIteration}
      />
    );
  }
);

Saurus.displayName = 'Saurus';
