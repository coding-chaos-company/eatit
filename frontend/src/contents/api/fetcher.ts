import { ClientError, ConnectionError, ServerError } from './errors';

export type Fetcher = typeof fetcher;

export const fetcher = async <Response>(
  path: string,
  init: RequestInit = {}
): Promise<Response> => {
  const { headers, ...args } = init;

  try {
    const res = await fetch(`http://localhost:8080/${path}`, {
      mode: 'cors',
      headers: new Headers({
        ...(headers ?? {}),
      }),
      ...args,
    });

    if (res.status >= 400 && res.status < 500) {
      throw new ClientError(res.status, res.statusText);
    }

    if (res.status >= 500) {
      throw new ServerError(res.status, res.statusText);
    }

    return await res.json();
  } catch (error) {
    throw new ConnectionError(error instanceof Error ? error.message : undefined);
  }
};
