import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { SaurusArea, styleText } from './components';

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
  style.textContent = styleText;
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
 * Components
 */
const Index = () => {
  return <SaurusArea />;
};

export default Index;
