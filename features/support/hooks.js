const {After, Before, AfterStep, Status} = require('@cucumber/cucumber');
const playwright = require('playwright');

Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();  
});

After({tags: "@smoke"}, function () {
    // Clean up actions after each scenario can be added here
    console.log('Scenario finished, performing cleanup.');  
});

AfterStep( function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    return this.page.screenshot({ path: `screenshot-failed-step-${Date.now()}.png` });
  }
});