import { checkIfSelf, getUserName } from '@/contents/utils';
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { type MouseEventHandler, useEffect, useState } from 'react';
import * as statusAPI from './api/status';
import type { DinoStatus } from './api/types';
import { Container, styleTextContainer } from './components/container';
import { DeadDino, styleTextDeadDino } from './components/dead-dino';
import { DinoHome, styleTextDinoHome } from './components/dino-home';
import { DinoSelection, styleTextDinoSelection } from './components/dino-selection';
import { Loading, styleTextLoading } from './components/loading';

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
  style.textContent = `${styleTextDinoHome} ${styleTextContainer} ${styleTextDinoSelection} ${styleTextLoading} ${styleTextDeadDino}`;
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
  const [isRestarted, setIsRestarted] = useState(false);

  /**
   * Handler
   */
  const handleChangeDinoStatus = (status: DinoStatus) => {
    setDinoStatus((prev) => ({ ...prev, ...status }));
  };
  const onClickRestartButton: MouseEventHandler<HTMLButtonElement> = () => {
    setIsRestarted(true);
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

  /**
   * Rendering
   */
  // 他人のユーザページで、かつそのユーザが未登録または死んでる場合は何も表示しない
  if ((!dinoStatus || dinoStatus.level <= 0) && !isMe) {
    return;
  }

  // ステータスが返ってくるまではローディングを表示する
  if (!dinoStatus) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  // 死んでる時は遺影を表示する（リスタートボタンを押したら選択画面に変える）
  if (dinoStatus.level === -1) {
    return (
      <Container>
        {!isRestarted ? (
          <DeadDino onClick={onClickRestartButton} />
        ) : (
          <DinoSelection dinoStatus={dinoStatus} handleChangeDinoStatus={handleChangeDinoStatus} />
        )}
      </Container>
    );
  }

  return (
    <Container>
      {dinoStatus.level > 0 ? (
        <DinoHome
          isMe={isMe}
          dinoStatus={dinoStatus}
          handleChangeDinoStatus={handleChangeDinoStatus}
        />
      ) : (
        <DinoSelection dinoStatus={dinoStatus} handleChangeDinoStatus={handleChangeDinoStatus} />
      )}
    </Container>
  );
};

export default Index;
