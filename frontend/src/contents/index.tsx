import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { Suspense, useEffect, useState } from 'react';
import * as feedAPI from './api/register';
import { Container, styleTextContainer } from './components/container';
import { SaurusArea, styleTextSaurusArea } from './components/saurus-area';
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
  style.textContent = `${styleTextSaurusArea} ${styleTextContainer}`;
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
 * Component
 */
const Index = () => {
  return (
    <Container>
      <SaurusArea isMe={isMe} />
    </Container>
  );
};

export default Index;
