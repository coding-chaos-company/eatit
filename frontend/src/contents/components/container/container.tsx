import type { ReactNode } from 'react';
import * as styles from './container.module.css';

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  const fenceImage = chrome.runtime.getURL('assets/fence.png');

  return (
    <div className={styles.container} data-testid="container">
      <div className={styles.field}>{children}</div>
      <img className={styles.fence} alt="fence" src={fenceImage} />
    </div>
  );
};
