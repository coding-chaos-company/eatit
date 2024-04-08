import type { DinoStatus } from '@/contents/api/types';
import type { DinoBehavior } from '@/contents/components/dino-home/dino-home';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type State = {
  dinoStatus: DinoStatus | null;
  isRestarted: boolean;
  dinoBehavior: DinoBehavior;
  serving: boolean;
  splitting: boolean;
  visibility: 'visible' | 'hidden';
};

export type Actions = {
  initializeState: () => void;
  restartAnimation: () => void;
  stopAnimation: () => void;
  setDinoStatus: (status: Partial<DinoStatus>) => void;
  setIsRestarted: (isRestarted: boolean) => void;
  setDinoBehavior: (behavior: Partial<DinoBehavior>) => void;
  setServing: (serving: boolean) => void;
  setSplitting: (splitting: boolean) => void;
  setVisibility: (visibility: 'visible' | 'hidden') => void;
};

const initialState = {
  dinoStatus: null,
  isRestarted: false,
  dinoBehavior: {
    startPos: 0,
    direction: 'right',
    animation: 'walking',
    state: 'walk',
  },
  serving: false,
  splitting: false,
  visibility: 'visible',
} satisfies State;

export const usePageStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,

    initializeState: () => {
      set((state) => {
        state.dinoStatus = initialState.dinoStatus;
        state.dinoBehavior = initialState.dinoBehavior;
        state.serving = initialState.serving;
        state.splitting = initialState.splitting;
        state.visibility = initialState.visibility;
        state.isRestarted = initialState.isRestarted;
      });
    },
    restartAnimation: () => {
      set((state) => {
        state.serving = false;
        state.visibility = 'visible';
        state.dinoBehavior = initialState.dinoBehavior;
      });
    },
    stopAnimation: () => {
      set((state) => {
        state.dinoBehavior.animation = 'stop';
        state.visibility = 'hidden';
      });
    },
    setDinoStatus: (status) => {
      set((state) => {
        state.dinoStatus = { ...state.dinoStatus, ...status };
      });
    },
    setIsRestarted: (isRestarted) => {
      set((state) => {
        state.isRestarted = isRestarted;
      });
    },
    setDinoBehavior: (behavior) => {
      set((state) => {
        state.dinoBehavior = { ...state.dinoBehavior, ...behavior };
      });
    },
    setServing: (serving) => {
      set((state: State) => {
        state.serving = serving;
      });
    },
    setSplitting: (splitting) => {
      set((state) => {
        state.splitting = splitting;
      });
    },
    setVisibility: (visibility) => {
      set((state) => {
        state.visibility = visibility;
      });
    },
  }))
);
