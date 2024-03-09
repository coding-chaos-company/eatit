import type { TestInfo } from '@playwright/test';

export const screenshotOption = (
  title: string,
  testInfo: TestInfo
): [string[], Record<never, never>] => {
  return [
    [testInfo.title, `${title}.png`],
    {
      fullPage: true,
    },
  ];
};
