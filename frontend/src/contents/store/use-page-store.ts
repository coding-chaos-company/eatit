import type { DinoStatus } from '@/contents/api/types';
import type { DinoBehavier } from '@/contents/components/dino-home/dino-home';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type State = {
  dinoStatus: DinoStatus | null;
  isRestarted: boolean;
  dinoBehavier: DinoBehavier;
  serving: boolean;
  splitting: boolean;
  visiblity: 'visible' | 'hidden';
};

export type Actions = {
  initializeState: () => void;
  setDinoStatus: (status: Partial<DinoStatus>) => void;
  setIsRestarted: (isRestarted: boolean) => void;
  setDinoBehavier: (behavier: Partial<DinoBehavier>) => void;
  setServing: (serving: boolean) => void;
  setSplitting: (splitting: boolean) => void;
  setVisiblity: (visiblity: 'visible' | 'hidden') => void;
};

const initialState = {
  dinoStatus: null,
  isRestarted: false,
  dinoBehavier: {
    startPos: 0,
    direction: 'right',
    animation: 'walking',
    state: 'walk',
  },
  serving: false,
  splitting: false,
  visiblity: 'visible',
} satisfies State;

export const usePageStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,

    initializeState: () => {
      set((state) => {
        state.dinoStatus = initialState.dinoStatus;
        state.dinoBehavier = initialState.dinoBehavier;
        state.serving = initialState.serving;
        state.splitting = initialState.splitting;
        state.visiblity = initialState.visiblity;
        state.isRestarted = initialState.isRestarted;
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
    setDinoBehavier: (behavier) => {
      set((state) => {
        state.dinoBehavier = { ...state.dinoBehavier, ...behavier };
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
    setVisiblity: (visiblity) => {
      set((state) => {
        state.visiblity = visiblity;
      });
    },
  }))
);
