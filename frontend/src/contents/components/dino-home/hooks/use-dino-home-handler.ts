import * as feedAPI from '@/contents/api/feed';
import type { Actions, State } from '@/contents/store/use-page-store';
import { getCurrentDinoPosition, getUserName, wait } from '@/contents/utils';
import {
  type AnimationEventHandler,
  type MouseEventHandler,
  type RefObject,
  useCallback,
} from 'react';

export type Mutations = Pick<Actions, 'setServing' | 'setDinoBehavier' | 'setDinoStatus'>;
export type HandlerArgs = {
  dinoBehavier: State['dinoBehavier'];
  areaRef: RefObject<HTMLDivElement>;
  dinoRef: RefObject<HTMLDivElement>;
};

export const useDinoHomeHandler = (
  { areaRef, dinoRef, dinoBehavier }: HandlerArgs,
  { setServing, setDinoBehavier, setDinoStatus }: Mutations
) => {
  const handleClickFeedButton = useCallback(() => {
    // ご飯を落とす
    setServing(true);

    setDinoBehavier({
      startPos: getCurrentDinoPosition(areaRef, dinoRef),
      direction: 'right',
      animation: 'toBowl',
    });
  }, [setDinoBehavier, setServing, areaRef, dinoRef]);

  const handleDinoAnimationIteration: AnimationEventHandler<HTMLImageElement> = useCallback(
    async (e) => {
      // 端まで歩いた時
      if (e.animationName.endsWith('walking')) {
        setDinoBehavier(
          dinoBehavier.direction === 'right' ? { direction: 'left' } : { direction: 'right' }
        );
      }

      // エサを食べにbowlまで到達した時
      if (e.animationName.endsWith('toBowl')) {
        // animationを止めて、bend状態にする
        setDinoBehavier({
          startPos: 'calc(100% - 160px)',
          animation: 'stop',
          state: 'bend',
        });

        try {
          // bendのgifアニメーションを待つ
          await wait(2000);

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

      // エサを食べ終わった時
      if (e.animationName.endsWith('toWalking')) {
        setDinoBehavier({ animation: 'walking', direction: 'right', startPos: 0 });
      }
    },
    [setDinoBehavier, setServing, setDinoStatus, dinoBehavier.direction]
  );

  return {
    handleClickFeedButton,
    handleDinoAnimationIteration,
  };
};
