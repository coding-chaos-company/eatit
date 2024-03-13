/**
 * 通信エラー
 */
export class ConnectionError extends Error {
  constructor(message?: string) {
    super(message ? `Connection Error: ${message}` : undefined);
  }
}

/**
 * 400番台（クライアントエラー）
 */
export class ClientError extends Error {
  readonly code: number;
  readonly message: string;

  constructor(code: number, message: string) {
    super(`${code} ${message}`);
    this.code = code;
    this.message = message;
  }
}

/**
 * 500番台（サーバーエラー）
 */
export class ServerError extends Error {
  readonly code: number;
  readonly message: string;

  constructor(code: number, message: string) {
    super(`${code} ${message}`);
    this.code = code;
    this.message = message;
  }
}
