import { checkIfSelf, getUserName } from '@/contents/utils';
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { useEffect, useState } from 'react';
import * as statusAPI from './api/status';
import type { DinoStatus } from './api/types';
import { Container, styleTextContainer } from './components/container';
import { DinoHome, styleTextDinoHome } from './components/dino-home';
import { DinoSelection, styleTextDinoSelection } from './components/dino-selection';
import { Loading } from './components/loading/loading';

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

  // 他人のユーザページで、かつそのユーザが未登録または死んでる場合は何も表示しない
  if ((!dinoStatus || dinoStatus.level <= 0) && !isMe) {
    return;
  }

  return (
    <Container>
      {!dinoStatus ? (
        <Loading />
      ) : (
        <>
          {dinoStatus.level > 0 ? (
            <DinoHome
              isMe={isMe}
              dinoStatus={dinoStatus}
              handleChangeDinoStatus={handleChangeDinoStatus}
            />
          ) : (
            <DinoSelection
              dinoStatus={dinoStatus}
              handleChangeDinoStatus={handleChangeDinoStatus}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Index;
