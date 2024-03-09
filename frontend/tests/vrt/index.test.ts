import { expect, test } from '@/tests/utils/fixtures';
import { UserPage } from '@/tests/utils/pages/github/:user-id';
import { screenshotOption } from './utils/screenshot-options';

test('example test', async ({ page }, testInfo) => {
  const userPage = new UserPage(page)

  await userPage.goto({userId: 'k1tikurisu', year: 2023});

  await expect(page).toHaveScreenshot(...screenshotOption('初期状態', testInfo));
});
