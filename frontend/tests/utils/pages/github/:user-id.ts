import type { Locator, Page } from '@playwright/test';

import { Base } from '@/tests/utils/pages/base';

export class UserPage extends Base {
  async goto({ userId, year }: { userId: string; year: number }) {
    const response = await this.page.goto(
      `https://github.com/${userId}?tab=overview&from=${year}-12-01&to=${year}-12-31`
    );
    return response;
  }
}
