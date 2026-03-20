import { expect } from '@playwright/test';

export class ActivityPage {
    constructor(page) {
        this.page = page;
    }

    //--- Click on Add Activity button to create a new Activity---
    async createActivity(data) {

        const activitiesPanel = this.page.getByRole('tabpanel', { name: 'Activities' });
        const addActivityDetails = activitiesPanel.getByRole('link', { name: 'Add activity' }).nth(1);
        await addActivityDetails.scrollIntoViewIfNeeded();
        await addActivityDetails.click();

    }

    //---Click on Activity drop down to select an Activity---
    async selectActivity(data) {

        await this.page.locator('[data-test-id="202109170528520512682"] i').click();

        //---Select Activity type as provided in excel---
        await this.page.getByText(data.ActivityType, { exact: true }).click();

    }
    

    //---Select Estimated Start Date as provided in excel---
    async selectActivityStartDate(data) {


        await this.page.locator('[data-test-id="202010270812270320970_startDate_DateRange"]').click();
        await this.page.getByRole('cell', { name: String(data.StartDay), exact: true }).nth(2).click();
    }

    //---Select Estimated End Date as provided in excel---
    async selectActivityEndDate(data) {


        await this.page.locator('[data-test-id="202010270812270320970_endDate_DateRange"]').click();
        await this.page.getByRole('cell', { name: String(data.EndDay) }).nth(2).click();
    }
        

    /*
    //---Select Estimated Start Date as provided in excel---
    async selectActivityStartDate(data) {


        await this.page.locator('[data-test-id="202010270812270320970_startDate_DateRange"]').click();
        await this.page.getByRole('cell', { name: String(data.StartDay), exact: true }).nth(2).click();

       
    }


       //---Select Estimated End Date as provided in excel---
    async selectActivityEndDate(data) {


        await this.page.locator('[data-test-id="202010270812270320970_endDate_DateRange"]').click();
        await this.page.getByRole('cell', { name: String(data.EndDay) }).nth(2).click();
    }
 */

    //---Add Auditor details to the Activity---
    async addAuditor(data) {

        //---Click on Add Auditor button---
        await this.page.getByText('ActivitiesAudit Arrow down to open. Start typing to search. Title Description').click();
        await this.page.getByText('Add Auditor(s)').click();

        //---Select Auditor Name from dropdown as provided in excel---
        await this.page.locator('.combo-box > button').first().click();
        await this.page.locator('[data-test-id="20200702141236011213"]').fill(data.AuditorName);

        const auditorRow = this.page
            .locator('[id^="autocomplete_option_row_"]')
            .filter({ hasText: data.AuditorName })
            .filter({ hasText: data.AuditorType || 'Auditor' }) // <-- uses your new Excel column
            .first();

        await expect(auditorRow).toBeVisible();
        await auditorRow.click();

        //---Select Auditor Role---
        await this.page.locator('.content-item.content-field.item-2 >> .combo-box > button').click();
        await this.page.locator('[data-test-id="202007021412360112609"]').fill(data.AuditorRole);
        await this.page.getByRole('option', { name: data.AuditorRole }).first().click();

        //---Enter Auditor Hours as provided in excel---
        await this.page.locator('[data-test-id="202010091237070353203"]').fill(String(data.Hours));

        //---Click Submit to save the Auditor---
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    //---Add Location details to the Activity---
    async addLocation(data) {

        //---Select the Location Checkbox---
        await expect(this.page.getByText('Location/Site(s)')).toBeVisible();
        await this.page.locator('[data-test-id="202010270800030831210"]').first().check();

        //---Click on Add Location button---
        await this.page.locator('[data-test-id="2015071603054009744126"]').click();

        const dialog = this.page.getByRole('dialog', { name: /Manage locations/i });
        const input = dialog.locator('[data-test-id="202006040909060519143"]');

        const query = String(data.Location || '').trim().replace(/,+\s*$/, '');

        await input.click();
        await input.fill(query);
        await input.press('ArrowDown'); // open suggestions

        const options = this.page.locator('li[role="option"][id^="autocomplete_option_row_"]');
        await expect(options.first()).toBeVisible({ timeout: 30000 });

        // pick an option that matches query BUT is not the "Use ..." row
        const realOption = options
            .filter({ hasText: query })
            .filter({ hasNotText: /^Use\s+"/ })   // ✅ excludes: Use "...."
            .first();

        await expect(realOption).toBeVisible();
        await realOption.click();

        await dialog.getByRole('button', { name: 'Submit' }).click();



    }

    //---Add Checklist details to the Activity---
    async addCheckList(data) {

        //---Click on  Add checklist---
        await this.page.getByRole('link', { name: 'Add checklist(s)' }).click();
        await this.page.locator('#msContainer9c2eac26 > .caret-down-img').click();

        //---Select the checklist as provided in the excel---
        await this.page.getByText(data.Checklist).click();

        //---Click on Submit button to save the checklist---
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    //---Save Activity details---
    async saveActivityDetails() {

        //---Click on Save & Continue button to save the Activity details
        await this.page.locator('[data-test-id="20161017110917023176385"]').click();
    }

    //---Save and Display Activity ID---
    async readActivityID() {
        //---Store and Print the Activity ID---
        const firstActivity = this.page
            .locator('[data-test-id^="202009301406070652774-R"] [data-test-id="2016072109335505834280"]')
            .first();

        await expect(firstActivity).toBeVisible();
        const activityID = await firstActivity.textContent();
        console.log('Activity ID:', activityID);

    }

    //--- Display Activity Status---
    async readActivityStatus() {

        //---Display the Activity Status---
        const activityStatus = this.page.locator('[data-test-id^="202009301406070652774-R"] [data-test-id="2016083016191602341167946"]')
            .first();

        const status = await activityStatus.textContent();
        console.log('Activity Status:', status);

    }

}
