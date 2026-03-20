// pages/PhasePage.js
import { expect } from '@playwright/test';



function excelDateToUiString(v) {
  // If Excel gave serial number
  if (typeof v === 'number') {
    const d = new Date(Math.round((v - 25569) * 86400 * 1000));
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  // If Excel already string like "07/01/2026"
  return String(v).trim();
}

export class PhasePage {
  constructor(page) {
    this.page = page;
     this.phaseIdLocator = this.page.locator('[data-test-id="20190510022618055338234"]');
    this.phaseStatusLocator = this.page.locator('[data-test-id="2016083016191602341167946"]');
    this.startDateInput = this.page.locator('[data-test-id="202309280859110159127"]');
    this.reminderDateInput = this.page.locator('input[data-test-id="202204061001380130998"][name="$PpyWorkPage$ppySLAGoal"]:not([disabled])').first();
    //this.dueDateInput = this.page.locator('[data-test-id="202204061001380132295"]');
     this.dueDateInput = this.page.locator('input[data-test-id="202204061001380132295"][name="$PpyWorkPage$ppySLADeadline"][data-editinput="DateTime-Calendar"]:not([disabled])');
     // Phase Duration dropdown (Surveillance only)
    this.phaseDurationSelect = this.page.locator('[data-test-id="202310121320400345980"]');
    }

  //---Create a new Phase ---
  async createPhase(type, desc) {

    //---Click on Create Phase Link---
    await this.page.locator('[data-test-id="202201041753370952402"]').click();

    //--- Select Phase Type from drop down list---
    await this.page.locator('[data-test-id="202011111720010458772"]').selectOption(type);

    //---Provide Description of the Phase---
    await this.page.locator('[data-test-id="202011111723140860463"]').fill(desc);
   
  }

  //--- Provide Start Date---
  async createStartDate(data){
  
    await this.startDateInput.fill(String(data.StartDate));
    await this.startDateInput.press('Tab');
  }
 
  //--- Provide Reminder Date---
  async createReminderDate(data){
await this.reminderDateInput.fill(String(data.ReminderDate));
  await this.reminderDateInput.press('Tab'); // commit in Pega

  }

  //--- Provide Due Date---
 async createDueDate(data){
 const phaseType = String(data?.PhaseType || '').trim().toLowerCase();

  if (phaseType.includes('surveillance')) return;

  await this.dueDateInput.fill(String(data?.DueDate ?? ''));
  await this.dueDateInput.press('Tab');

  }

  //--- Provide Phase Duration---
async selectPhaseDurationIfSurveillance(data) {
  const phaseType = String(data.PhaseType || '').toLowerCase();
  if (!phaseType.includes('surveillance')) return;

  // Excel should provide MOA12 / MOA24 / MOA48 etc.
  await this.phaseDurationSelect.selectOption(String(data.PhaseDuration));
}

 //---Click on Create button to complete Phase creation---
 async savePhaseDetails(){
    await this.page.locator('[data-test-id="20161017110917023277518"]').click();

 }
  

  //---Open Phase Id Details---
  async openPhaseID(phaseID){

  //--- Provide Phase ID to open it--- 
  await this.page.getByRole('link', { name: phaseID }).click();

  }


 //---Save and Display Phase Id and Status---
  async capturePhaseData() {
    // wait until visible
    await expect(this.phaseIdLocator.first()).toBeVisible();

    const phaseId = await this.phaseIdLocator.first().textContent();
    const phaseStatus = await this.phaseStatusLocator.first().textContent();

    console.log('Phase ID:', phaseId);
    console.log('Phase Status:', phaseStatus);

    //return { phaseId, phaseStatus };
  }
}
