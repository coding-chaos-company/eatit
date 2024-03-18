import type { ReactNode } from 'react';
import * as styles from './container.module.css';

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container} data-testid="container">
      {children}
    </div>
  );
};
