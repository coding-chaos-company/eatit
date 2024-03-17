import { fetcher } from '@/contents/api/fetcher';
import type { DinoStatus } from '@/contents/api/types';

type MeParams = {
  github_name: string;
};

export type MeResponse = {
  status: DinoStatus | null;
};

/**
 *  POST /me
 */
export const get = (params: MeParams) =>
  fetcher<MeResponse>('me', { method: 'POST', body: JSON.stringify(params) });
