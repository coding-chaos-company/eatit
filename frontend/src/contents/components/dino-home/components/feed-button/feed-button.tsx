import type { MouseEventHandler } from 'react';

type FeedButtonProps = {
  onClick: MouseEventHandler;
  disabled: boolean;
};

export const FeedButton = ({ onClick, disabled }: FeedButtonProps) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {chrome.i18n.getMessage('dinoSelection_feedButton')}
    </button>
  );
};
