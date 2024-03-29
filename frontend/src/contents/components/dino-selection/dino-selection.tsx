import * as registerAPI from '@/contents/api/register';
import type { DinoStatus } from '@/contents/api/types';
import { usePageStore } from '@/contents/store/use-page-store';
import { getUserName, wait } from '@/contents/utils';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { EggSplit, StartButton } from './components';
import { SelectColor } from './components/select-color/select-color';
import * as styles from './dino-selection.module.css';

export const DinoSelection = () => {
  /**
   * State
   */
  const { color, splitting, dinoStatus, setColor, setSplitting, setDinoStatus } = usePageStore(
    useShallow((state) => ({
      color: state.color,
      splitting: state.splitting,
      dinoStatus: state.dinoStatus,
      setColor: state.setColor,
      setSplitting: state.setSplitting,
      setDinoStatus: state.setDinoStatus,
    }))
  );

  /**
   * Handler
   */
  const onChangeColorHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const color = e.target.value as DinoStatus['color'];
    setColor(color);
  };
  const onClickStartButtonHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setSplitting(true);

      const start = performance.now();

      const res = await registerAPI.post({
        github_name: getUserName(),
        color,
        level: dinoStatus.level,
      });

      const end = performance.now();

      // 卵が割れるのを待つ
      await wait(9400 - (end - start));

      setDinoStatus(res.status);
    } catch {
      /** エラーハンドリング */
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.egg}>
        {splitting ? (
          <div className={styles.eggSplit}>
            <EggSplit color={color} />
          </div>
        ) : (
          <SelectColor onChangeColorHandler={onChangeColorHandler} />
        )}
      </div>
      {!splitting && (
        <div className={styles.button}>
          <StartButton onClick={onClickStartButtonHandler} disabled={splitting} />
        </div>
      )}
    </div>
  );
};
