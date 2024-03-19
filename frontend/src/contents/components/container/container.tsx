import fenceImage from 'data-base64:~/../assets/fence.png';
import type { ReactNode } from 'react';
import * as styles from './container.module.css';

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container} data-testid="container">
      <div className={styles.field}>{children}</div>
      <img className={styles.fence} alt="fence" src={fenceImage} />
    </div>
  );
};
