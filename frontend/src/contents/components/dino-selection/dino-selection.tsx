import * as registerAPI from '@/contents/api/register';
import type { DinoStatus } from '@/contents/api/types';
import { getUserName } from '@/contents/utils';
import { type MouseEventHandler, useState } from 'react';
import * as styles from './dino-selection.module.css';
import { Egg } from './egg/egg';
import { StartButton } from './start-button/start-button';

type DinoSelectionProps = {
  handleChangeDinoStatus: (status: Partial<DinoStatus>) => void;
};

export const DinoSelection = ({ handleChangeDinoStatus }: DinoSelectionProps) => {
  /**
   * State
   */
  const [disabled, setDisabled] = useState(false);
  const [color, _setColor] = useState<DinoStatus['color']>('green');

  /**
   * Handler
   */
  const onClickStartButtonHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      setDisabled(true);

      const res = await registerAPI.post({ github_name: getUserName(), color });

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
        <Egg color={color} />
      </div>
      <div className={styles.button}>
        <StartButton onClick={onClickStartButtonHandler} disabled={disabled} />
      </div>
    </div>
  );
};
