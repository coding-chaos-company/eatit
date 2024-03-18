import { fetcher } from '@/contents/api/fetcher';
import type { DinoStatus } from '@/contents/api/types';

type FeedParams = {
  github_name: string;
};

export type FeedResponse = {
  status: DinoStatus;
};

/**
 *  PUT /feed
 */
export const put = (params: FeedParams) =>
  fetcher<FeedResponse>('feed', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
