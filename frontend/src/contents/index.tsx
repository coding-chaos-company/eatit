import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { useEffect, useState } from 'react';
import * as feedAPI from './api/feed';
import { SaurusArea, styleText } from './components/saurus-area';
import { checkIfSelf } from './utils/check-if-self';

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
  style.textContent = `${styleText}`;
  return style;
};

/**
 * Anchor
 * 草が生えているエリアを取得する
 */
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(
    '#user-profile-frame > div > div:nth-child(3) > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1)'
  );

/**
 * ログインユーザのページかどうかを判定する
 */
const isMe = checkIfSelf();

/**
 * Component
 */
const Index = () => {
  const [a, setA] = useState<feedAPI.FeedResponse>();

  useEffect(() => {
    const fetchFeed = async () => {
      const res = await feedAPI.put({
        github_name: window.location.pathname.split('/')[1],
      });

      setA(res);
    };

    fetchFeed();
  }, [a]);

  console.log(a);
  console.log(window.location.pathname.split('/')[1]);

  return <SaurusArea isMe={isMe} />;
};

export default Index;
