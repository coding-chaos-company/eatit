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
  color: DinoStatus['color'];
  visiblity: 'visible' | 'hidden';
};

export type Actions = {
  setDinoStatus: (status: DinoStatus) => void;
  setIsRestarted: (isRestarted: boolean) => void;
  setDinoBehavier: (behavier: Partial<DinoBehavier>) => void;
  setServing: (serving: boolean) => void;
  setSplitting: (splitting: boolean) => void;
  setColor: (color: DinoStatus['color']) => void;
  setVisiblity: (visiblity: 'visible' | 'hidden') => void;
};

export const usePageStore = create<State & Actions>()(
  immer((set) => ({
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
    color: 'green',
    visiblity: 'visible',

    setDinoStatus: (status) => {
      set((state) => {
        state.dinoStatus = status;
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
    setColor: (color) => {
      set((state) => {
        state.color = color;
      });
    },
    setVisiblity: (visiblity) => {
      set((state) => {
        state.visiblity = visiblity;
      });
    },
  }))
);
