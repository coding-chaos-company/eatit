import * as registerAPI from '@/contents/api/register';
import type { DinoStatus } from '@/contents/api/types';
import { getUserName } from '@/contents/utils';
import { type ChangeEventHandler, type MouseEventHandler, useState } from 'react';
import { StartButton } from './components';
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
  const [disabled, setDisabled] = useState(false);
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
      setDisabled(true);

      const res = await registerAPI.post({
        github_name: getUserName(),
        color,
        level: dinoStatus.level,
      });

      handleChangeDinoStatus(res.status);
    } catch {
      /** エラーハンドリング */
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.egg}>
        <SelectColor onChangeColorHandler={onChangeColorHandler} />
      </div>
      <div className={styles.button}>
        <StartButton onClick={onClickStartButtonHandler} disabled={disabled} />
      </div>
    </div>
  );
};
