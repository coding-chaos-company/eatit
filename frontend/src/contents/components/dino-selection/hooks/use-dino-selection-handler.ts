import * as registerAPI from '@/contents/api/register';
import type { DinoStatus } from '@/contents/api/types';
import type { Actions, State } from '@/contents/store/use-page-store';
import { getCurrentDinoPosition, getUserName, wait } from '@/contents/utils';
import {
  type AnimationEventHandler,
  type ChangeEventHandler,
  type RefObject,
  useCallback,
} from 'react';

export type Mutations = Pick<Actions, 'setColor' | 'setSplitting' | 'setDinoStatus'>;
export type HandlerArgs = {
  color: State['color'];
  level: State['dinoStatus']['level'];
};

export const useDinoSelectionHandler = (
  { color, level }: HandlerArgs,
  { setColor, setSplitting, setDinoStatus }: Mutations
) => {
  const handleChangeColorHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const color = e.target.value as DinoStatus['color'];
      setColor(color);
    },
    [setColor]
  );

  const handleClickStartButton = useCallback(async () => {
    try {
      setSplitting(true);

      registerAPI.post({
        github_name: getUserName(),
        color,
        level,
      });

      // 卵が割れるのを待つ
      await wait(9400);

      setDinoStatus({
        color,
        level: level <= 0 ? 1 : level,
      });
    } catch {
      /** エラーハンドリング */
    } finally {
      setSplitting(false);
    }
  }, [setSplitting, setDinoStatus, level, color]);

  return {
    handleChangeColorHandler,
    handleClickStartButton,
  };
};
