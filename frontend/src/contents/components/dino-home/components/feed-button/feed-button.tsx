import type { MouseEventHandler } from 'react';
import * as styles from './feed-button.module.css';

type FeedButtonProps = {
  onClick: MouseEventHandler;
  disabled: boolean;
};

export const FeedButton = ({ onClick, disabled }: FeedButtonProps) => {
  return (
    <button className={styles.button} type="button" disabled={disabled} onClick={onClick}>
      {chrome.i18n.getMessage('dinoSelection_feedButton')}
    </button>
  );
};
