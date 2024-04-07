import * as feedAPI from '@/contents/api/feed';
import type { Actions, State } from '@/contents/store/use-page-store';
import { getCurrentDinoPosition, getUserName, wait } from '@/contents/utils';
import { type AnimationEventHandler, type RefObject, useCallback, useEffect } from 'react';

export type Mutations = Pick<Actions, 'setServing' | 'setDinoBehavior' | 'setDinoStatus'>;
export type HandlerArgs = {
  direction: State['dinoBehavior']['direction'];
  areaRef: RefObject<HTMLDivElement>;
  dinoRef: RefObject<HTMLDivElement>;
};

export const useDinoHomeHandler = (
  { areaRef, dinoRef, direction }: HandlerArgs,
  { setServing, setDinoBehavior, setDinoStatus }: Mutations
) => {
  const handleClickFeedButton = useCallback(() => {
    // ご飯を落とす
    setServing(true);

    setDinoBehavior({
      startPos: getCurrentDinoPosition(areaRef, dinoRef),
      direction: 'right',
      animation: 'toBowl',
    });
  }, [setDinoBehavior, setServing, areaRef, dinoRef]);

  const handleDinoAnimationIteration: AnimationEventHandler<HTMLImageElement> = useCallback(
    async (e) => {
      // 端まで歩いた時
      if (e.animationName.endsWith('walking')) {
        setDinoBehavior(direction === 'right' ? { direction: 'left' } : { direction: 'right' });
      }

      // エサを食べにbowlまで到達した時
      if (e.animationName.endsWith('toBowl')) {
        // animationを止めて、bend状態にする
        setDinoBehavior({
          startPos: 'calc(100% - 160px)',
          animation: 'stop',
          state: 'bend',
        });

        try {
          // bendのgifアニメーションを待つ
          await wait(1790);

          // eatアニメーションを流す
          setDinoBehavior({ state: 'eat' });

          // 3秒ご飯食べるのを待つ
          await wait(3000);

          // requestを送る前にご飯食べるのやめる
          setDinoBehavior({ animation: 'toWalking', direction: 'left', state: 'walk' });
          setServing(false);

          const res = await feedAPI.put({ github_name: getUserName() });
          setDinoStatus(res.status);
        } catch {
          /** エラーハンドリング */
        }
      }

      // エサを食べ終わった時
      if (e.animationName.endsWith('toWalking')) {
        setDinoBehavior({ animation: 'walking', direction: 'right', startPos: 0 });
      }
    },
    [setDinoBehavior, setServing, setDinoStatus, direction]
  );

  return {
    handleClickFeedButton,
    handleDinoAnimationIteration,
  };
};
