import { usePageStore } from '@/contents/store/use-page-store';
import { checkIfSelf, getUserName } from '@/contents/utils';
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo';
import { type MouseEventHandler, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
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
  style.textContent =
    styleTextDinoHome +
    styleTextContainer +
    styleTextDinoSelection +
    styleTextLoading +
    styleTextDeadDino;
  return style;
};

/**
 * Anchor
 * 草が生えているエリアを取得する
 */
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('div.graph-before-activity-overview');

/**
 * Component
 */
const Index = () => {
  /**
   * ログインユーザのページかどうかを判定する
   */
  const isMe = checkIfSelf();

  /**
   * GitHubのユーザ名を取得する
   */
  const githubUserName = getUserName();

  /**
   * State
   */
  const { dinoStatus, isRestarted, setDinoStatus, setIsRestarted } = usePageStore(
    /**
     * useShallowで必要なものだけsubscribeすることで再描画を抑える
     * https://docs.pmnd.rs/zustand/guides/prevent-rerenders-with-use-shallow
     */
    useShallow((state) => ({
      dinoStatus: state.dinoStatus,
      isRestarted: state.isRestarted,
      setDinoStatus: state.setDinoStatus,
      setIsRestarted: state.setIsRestarted,
    }))
  );

  /**
   * Handler
   */
  const onClickRestartButton: MouseEventHandler<HTMLButtonElement> = () => {
    setIsRestarted(true);
  };

  /**
   * Life Cycle
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchStatus = async () => {
      const res = await statusAPI.post({ github_name: githubUserName });
      console.log(githubUserName);

      setDinoStatus(res.status);
    };

    fetchStatus();
  }, [window.location.pathname]);

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
        {!isRestarted ? <DeadDino onClick={onClickRestartButton} /> : <DinoSelection />}
      </Container>
    );
  }

  return <Container>{dinoStatus.level > 0 ? <DinoHome /> : <DinoSelection />}</Container>;
};

export default Index;
