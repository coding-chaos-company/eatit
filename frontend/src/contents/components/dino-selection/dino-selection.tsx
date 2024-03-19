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
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.egg}>
        {loading ? (
          <div className={styles.eggSplit}>
            <EggSplit color={color} />
          </div>
        ) : (
          <SelectColor onChangeColorHandler={onChangeColorHandler} />
        )}
      </div>
      {!loading && (
        <div className={styles.button}>
          <StartButton onClick={onClickStartButtonHandler} disabled={loading} />
        </div>
      )}
    </div>
  );
};
