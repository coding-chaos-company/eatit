export const checkIfSelf = () => {
  // アクセス時のContribution Settingsの有無でログインユーザかどうか判定する
  const contributionSettings = document.querySelector('summary.pinned-items-setting-link');

  return !!contributionSettings;
};
