import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { Suspense, useEffect, useState } from 'react';
import * as statusAPI from './api/status';
import { Container, styleTextContainer } from './components/container';
import { DinoHome, styleTextDinoHome } from './components/dino-home';
import { DinoSelection, styleTextDinoSelection } from './components/dino-selection';
import { checkIfSelf } from './utils/check-if-self';
import { getUserName } from './utils/get-user-name';

/**
 * Matches
 */
export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*'],
};

/**
 * CSS Modules
 */
export const getStyle = () => {
  const style = document.createElement('style');
  style.textContent = `${styleTextDinoHome} ${styleTextContainer} ${styleTextDinoSelection}`;
  return style;
};

/**
 * Anchor
 * 草が生えているエリアを取得する
 */
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('div.graph-before-activity-overview');

/**
 * ログインユーザのページかどうかを判定する
 */
const isMe = checkIfSelf();

/**
 * GitHubのユーザ名を取得する
 */
const githubUserName = getUserName();

/**
 * Component
 */
const Index = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await statusAPI.post({ github_name: githubUserName });

      setStatus(res.status);
    };

    fetchMe();
  }, []);

  // 他人のユーザページで、そのユーザが未登録の場合は何も表示しない
  if (!status && !isMe) {
    return;
  }

  return <Container>{status ? <DinoHome isMe={isMe} /> : <DinoSelection />}</Container>;
};

export default Index;
