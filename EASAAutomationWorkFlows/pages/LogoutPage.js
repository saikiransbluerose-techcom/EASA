export class LogoutPage {
  constructor(page) {
    this.page = page;
  }

  async logout() {
    await this.page.locator('[data-test-id="201901281552550130778"] [data-test-id="px-opr-image-ctrl"]').click();
    await this.page.getByRole('menuitem', { name: 'Log off' }).click();
  }
}
