import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://easa-easaux-dt1.pegacloud.net/prweb/PRAuth/app/OrgApproval/');
  await page.getByRole('textbox', { name: 'User name *' }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('textbox', { name: 'User name *' }).fill('TestAutomationUser');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Rules@1234');
  await page.getByRole('button', { name: 'Log in' }).click();

  //await page.pause();

  await page.getByRole('link', { name: 'Search Approvals' }).click();
  await page.getByRole('button', { name: 'Approval number Actions' }).click();
  await page.getByRole('menuitem', { name: ' Apply filter' }).click();
  await page.locator('[data-test-id="20160524050907021913810"]').click();
  await page.locator('[data-test-id="20160524050907021913810"]').fill('');
  await page.locator('[data-test-id="20160524050907021913810"]').click();
  //await page.locator('[data-test-id="20160524050907021913810"]').fill('EASA.145.0017');
  await page.locator('[data-test-id="20160524050907021913810"]').fill('EASA.145.3236');

  await page.locator('[data-test-id="201604060130370006117741"]').click();
 const approvalLink = page.getByRole('link', { name: String('EASA.145.3236'), exact: true }).first();
    await expect(approvalLink).toBeVisible();
    await approvalLink.click();


  await page.getByRole('link', { name: 'PH-5049' }).click();

//PH-5067

  const activitiesPanel = page.getByRole('tabpanel', { name: 'Activities' });

  const addActivityDetails = activitiesPanel.getByRole('link', { name: 'Add activity' }).nth(1);

  await addActivityDetails.scrollIntoViewIfNeeded();
  await addActivityDetails.click();


  await page.locator('[data-test-id="202109170528520512682"] i').click();
  await page.getByText('Audit', { exact: true }).click();
  await page.locator('[data-test-id="202010270812270320970_startDate_DateRange"]').click();
  await page.getByRole('cell', { name: '1', exact: true }).nth(2).click();
  await page.locator('[data-test-id="202010270812270320970_endDate_DateRange"]').click();
  await page.getByRole('cell', { name: '27' }).nth(1).click();
  await page.getByText('ActivitiesAudit Arrow down to open. Start typing to search. Title Description').click();
 // await page.getByText('Add Auditor(s)').click();


  // Open dropdown
//  await page.locator('.combo-box > button').first().click();

  // Type name
 // await page.locator('[data-test-id="20200702141236011213"]').fill('Rahul Toky');
/*
  // Click the suggestion ROW that contains both texts
  const rahulAuditorRow = page.locator('[id^="autocomplete_option_row_"]')
    .filter({ hasText: 'Rahul Toky' })
    .filter({ hasText: 'Auditor' })
    .first();

  await expect(rahulAuditorRow).toBeVisible();
  await rahulAuditorRow.click();

  // Open dropdown

  await page.locator('.content-item.content-field.item-2 >> .combo-box > button').click();

  await page.locator('[data-test-id="202007021412360112609"]').fill('Lead Auditor');

  await page.getByRole('option', { name: 'Lead Auditor' }).first().click();

  await page.locator('[data-test-id="202010091237070353203"]').click();
  await page.locator('[data-test-id="202010091237070353203"]').fill('20');

  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('link', { name: 'Add checklist(s)' }).click();
  await page.locator('#msContainer9c2eac26 > .caret-down-img').click();
  await page.getByText('Onsite (SMS)').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  */

  //'Konrad-Adenauer-Ufer'
  await page.pause();

  await expect(page.getByText('Location/Site(s)')).toBeVisible(); 
  await page.locator('[data-test-id="202010270800030831210"]').first().check(); 
  await page.locator('[data-test-id="2015071603054009744126"]').click();
  
const dialog = page.getByRole('dialog', { name: /Manage locations/i });
const input  = dialog.locator('[data-test-id="202006040909060519143"]');

const query = String('AVIATION HOUSE (street3)' || '').trim().replace(/,+\s*$/, '');

await input.click();
await input.fill(query);
await input.press('ArrowDown'); // open suggestions

const options = page.locator('li[role="option"][id^="autocomplete_option_row_"]');
await expect(options.first()).toBeVisible({ timeout: 30000 });

// pick an option that matches query BUT is not the "Use ..." row
const realOption = options
  .filter({ hasText: query })
  .filter({ hasNotText: /^Use\s+"/ })   // ✅ excludes: Use "...."
  .first();

await expect(realOption).toBeVisible();
await realOption.click();

await dialog.getByRole('button', { name: 'Submit' }).click();
  


   await page.locator('[data-test-id="20161017110917023176385"]').click();

    let activityIDLocator = page.locator('[data-test-id="2016072109335505834280"]');
    await expect(activityIDLocator).toBeVisible();

    let activityID = await activityIDLocator.textContent();
    console.log('Activity ID:', activityID);


    // await expect(page.locator('[data-test-id="2016072109335505834280"]')).toBeVisible();

    const activityStatusLocator = page.locator('[data-test-id="202009301406070652774-R1"] [data-test-id="2016083016191602341167946"]');
    await expect(activityIDLocator).toBeVisible();

    const activityStatus = activityIDLocator.textContent();
    console.log('Activity Status:', activityStatus);

  
});