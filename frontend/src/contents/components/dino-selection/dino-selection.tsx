import * as registerAPI from '@/contents/api/register';
import type { DinoStatus } from '@/contents/api/types';
import { usePageStore } from '@/contents/store/use-page-store';
import { getUserName, wait } from '@/contents/utils';
import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { EggSplit, StartButton } from './components';
import { SelectColor } from './components/select-color/select-color';
import * as styles from './dino-selection.module.css';
import { useDinoSelectionHandler } from './hooks/use-dino-selection-handler';

export const DinoSelection = () => {
  /**
   * State
   */
  const store = usePageStore(
    useShallow((state) => ({
      color: state.color,
      splitting: state.splitting,
      dinoStatus: state.dinoStatus,
      setColor: state.setColor,
      setSplitting: state.setSplitting,
      setDinoStatus: state.setDinoStatus,
    }))
  );
  const { color, splitting, dinoStatus } = store;

  /**
   * Handler
   */
  const { handleChangeColorHandler, handleClickStartButton } = useDinoSelectionHandler(
    { color, level: dinoStatus.level },
    store
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.egg}>
        {splitting ? (
          <div className={styles.eggSplit}>
            <EggSplit color={color} />
          </div>
        ) : (
          <SelectColor onChangeColorHandler={handleChangeColorHandler} />
        )}
      </div>
      {!splitting && (
        <div className={styles.button}>
          <StartButton onClick={handleClickStartButton} disabled={splitting} />
        </div>
      )}
    </div>
  );
};
