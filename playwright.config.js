// @ts-check
import { devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  retries: 1,
  workers:6,
  //for each test time out
  timeout: 20 * 1000,
  
  //assertion timeout
  expect: {
    timeout: 10000
  },
  
  reporter: [
    ['allure-playwright'],
    ['html']
  ],

  use: {
    browserName: 'chromium',
    headless : true,
    screenshot : 'on',
    trace : 'retain-on-failure'
  },
  
});

module.exports = config

