import * as registerAPI from '@/contents/api/register';
import type { DinoStatus } from '@/contents/api/types';
import { getUserName, wait } from '@/contents/utils';
import { type ChangeEventHandler, type MouseEventHandler, useState } from 'react';
import { EggSplit, StartButton } from './components';
import { SelectColor } from './components/select-color/select-color';
import * as styles from './dino-selection.module.css';

type DinoSelectionProps = {
  dinoStatus: DinoStatus;
  handleChangeDinoStatus: (status: Partial<DinoStatus>) => void;
};

export const DinoSelection = ({ dinoStatus, handleChangeDinoStatus }: DinoSelectionProps) => {
  /**
   * State
   */
  const [splitting, setSplitting] = useState(false);
  const [color, setColor] = useState<DinoStatus['color']>('green');

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

      const res = await registerAPI.post({
        github_name: getUserName(),
        color,
        level: dinoStatus.level,
      });

      // 割れるアニメーションを待つ
      await wait(7200);

      handleChangeDinoStatus(res.status);
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
