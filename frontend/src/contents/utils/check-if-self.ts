export const checkIfSelf = () => {
  // アクセス時のContribution Settingsの有無でログインユーザかどうか判定する
  const contributionSettings = document.querySelector(
    '#user-profile-frame > div > div:nth-child(3) > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1) > details'
  );

  return !!contributionSettings;
};
