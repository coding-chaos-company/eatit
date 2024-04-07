/**
 * wait関数
 * 指定の秒数待つが、その間に離脱した場合rejectする。
 */
export const wait = async (millisec: number) => {
  let timeoutId: NodeJS.Timeout;
  let visibilityListener: () => void;

  const waitForVisibilityChange = () => {
    return new Promise<void>((_resolve, reject) => {
      visibilityListener = () => {
        if (document.visibilityState === 'hidden') {
          clearTimeout(timeoutId);
          reject(new Error('Page became hidden before timeout'));
        }
      };
      document.addEventListener('visibilitychange', visibilityListener);
    });
  };

  const waitTimeout = () => {
    return new Promise<void>((resolve) => {
      timeoutId = setTimeout(resolve, millisec);
    });
  };

  try {
    await Promise.race([waitForVisibilityChange(), waitTimeout()]);
  } finally {
    document.removeEventListener('visibilitychange', visibilityListener);
  }
};
