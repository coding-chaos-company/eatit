import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { Suspense, useEffect, useState } from 'react';
import * as statusAPI from './api/status';
import type { DinoStatus } from './api/types';
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
  /**
   * State
   */
  const [dinoStatus, setDinoStatus] = useState<DinoStatus | null>(null);

  /**
   * Handler
   */
  const handleChangeDinoStatus = (status: DinoStatus) => {
    setDinoStatus((prev) => ({ ...prev, ...status }));
  };

  /**
   * Life Cycle
   */
  useEffect(() => {
    const fetchStatus = async () => {
      const res = await statusAPI.post({ github_name: githubUserName });

      setDinoStatus(res.status);
    };

    fetchStatus();
  }, []);

  // 他人のユーザページで、かつそのユーザが未登録の場合は何も表示しない
  if (!dinoStatus && !isMe) {
    return;
  }

  return (
    <Container>
      {dinoStatus && dinoStatus.level > 0 ? (
        <DinoHome
          isMe={isMe}
          dinoStatus={dinoStatus}
          handleChangeDinoStatus={handleChangeDinoStatus}
        />
      ) : (
        <DinoSelection handleChangeDinoStatus={handleChangeDinoStatus} />
      )}
    </Container>
  );
};

export default Index;
