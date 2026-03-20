// pages/SearchPage.js
import { expect } from '@playwright/test';

export class SearchPage {
  constructor(page) {
    this.page = page;
  }

  async openApproval(approval) {
    //---Click on Search Approval Menu Option---
    await this.page.getByRole('link', { name: 'Search Approvals' }).click();

    //---Click on Approval Number Column Action Options---
    await this.page.getByRole('button', { name: 'Approval number Actions' }).click();

    //---Click on Filter Option---
    await this.page.getByRole('menuitem', { name: 'Apply filter' }).click();

    //---Provide Approval Number in the Search Field
    const input = this.page.locator('[data-test-id="20160524050907021913810"]');
    await input.fill(approval);

    //---Click on Apply Search button
    await this.page.locator('[data-test-id="201604060130370006117741"]').click();

    //---Click on Organization Approval Case retrieved in Search result---
    const approvalLink = this.page.getByRole('link', { name: String(approval), exact: true }).first();
    await expect(approvalLink).toBeVisible();
    await approvalLink.click();
    
  }
}
