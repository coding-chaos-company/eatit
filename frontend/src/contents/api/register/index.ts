import { fetcher } from '../fetcher';

type RegisterParams = {
  github_name: string;
  color: 'green';
};

export type RegisterResponse = {
  color: 'green';
  kind: 'brachio';
  level: 1;
  loop: 1;
};

/**
 *  POST /register
 */
export const post = (params: RegisterParams) =>
  fetcher<RegisterResponse>('register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
