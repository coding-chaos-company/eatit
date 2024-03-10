import { ReactNode } from 'react';
import * as styles from './saurus-area.module.css';

type SaurusAreaProps = {
  children: ReactNode
}

export const SaurusArea = ({ children }: SaurusAreaProps) => {
  return <div className={styles.area} data-testid="SaurusArea">{children}</div>;
};
