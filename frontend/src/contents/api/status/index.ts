import { fetcher } from '@/contents/api/fetcher';
import type { DinoStatus } from '@/contents/api/types';

type StatusParams = {
  github_name: string;
};

export type StatusResponse = {
  status: DinoStatus | null;
};

/**
 *  POST /status
 */
export const post = (params: StatusParams) =>
  fetcher<StatusResponse>('status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
