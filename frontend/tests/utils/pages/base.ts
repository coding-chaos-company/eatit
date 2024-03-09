import type { Locator, Page } from '@playwright/test';

export abstract class Base {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
