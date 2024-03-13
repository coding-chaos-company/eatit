import { fetcher } from '../fetcher';

type ByeParams = {
  github_name: string;
};

type ByeResponse = string;

/**
 *  DELETE /bye
 */
export const deleteBye = (params: ByeParams) =>
  fetcher<ByeResponse>('bye', { method: 'DELETE', body: JSON.stringify(params) });
