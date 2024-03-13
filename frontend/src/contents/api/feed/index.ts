import { fetcher } from '../fetcher';

type FeedParams = {
  github_name: string;
};

export type FeedResponse = {
  color: 'green';
  kind: 'brachio';
  level: 1;
  loop: 1;
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
