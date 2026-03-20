export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    await this.page.goto('https://easa-easaux-dt1.pegacloud.net/prweb/PRAuth/app/OrgApproval/');
    await this.page.getByRole('textbox', { name: 'User name *' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}
