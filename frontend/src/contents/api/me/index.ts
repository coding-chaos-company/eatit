import { fetcher } from '../fetcher';

type MeParams = {
  github_name: string;
};

export type MeResponse = string;

/**
 *  GET /me
 */
export const get = (params: MeParams) =>
  fetcher<MeResponse>('me', { method: 'GET', body: JSON.stringify(params) });
