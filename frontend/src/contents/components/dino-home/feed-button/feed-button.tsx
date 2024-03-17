import type { MouseEventHandler } from 'react';

type FeedButtonProps = {
  onClick: MouseEventHandler;
  disabled: boolean;
};

export const FeedButton = ({ onClick, disabled }: FeedButtonProps) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      えさをやる
    </button>
  );
};
