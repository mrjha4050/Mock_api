const { chromium } = require('playwright');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
  const GITHUB_PASSWORD = process.env.GITHUB_PASSWORD;

  const SOURCE_PATH = '/unique-test-proxy-path'; // Ensure this is unique
  const MATCH_METHOD = 'POST'; // HTTP method for matching
  const WEBHOOK_URL = 'https://webhook.site/your-unique-url'; // Target webhook URL
  const DYNAMIC_PAYLOAD = '{\n   "key": "{{oReqBody \'fieldName\'}}"\n}'; // Dynamic payload

  try {
    console.log('Starting the script.');

    // Step 1: Navigate to Beeceptor login page
    await page.goto('https://app.beeceptor.com/login');
    console.log('Navigated to Beeceptor login page.');

    await page.getByRole('link', { name: ' Sign in with Github' }).click();
    console.log('Clicked "Sign in with Github".');

    // Step 3: Enter GitHub credentials
    await page.getByLabel('Username or email address').fill(GITHUB_USERNAME);
    console.log('Entered GitHub username.');
    await page.getByLabel('Password').fill(GITHUB_PASSWORD);
    console.log('Entered GitHub password.');

    // Step 4: Click "Sign in"
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    console.log('Clicked "Sign in".');

    await page.getByRole('link', { name: 'user-avatarNaman Jha' }).click();
    console.log('Navigated to user profile.');

    // Step 5: Navigate to "Your Endpoints"
    await page.getByRole('link', { name: 'Your Endpoints' }).click();
    console.log('Navigated to "Your Endpoints".');

    // Step 6: Select the endpoint
    await page.getByRole('link', { name: '#hitman' }).click();
    console.log('Selected the endpoint.');

    // Step 7: Open Mocking Rules
    await page.getByText('Mocking Rules (9)').click();
    console.log('Opened Mocking Rules.');

    // Step 8: Click "Additional Rule Types"
    await page.getByRole('button', { name: 'Additional Rule Types' }).click();
    console.log('Opened Additional Rule Types.');

    await page.getByRole('link', { name: 'Create Proxy or Callout' }).click();
    console.log('Started creating a new Proxy / Callout Rule.');

    await page.locator('#collapseTwo').getByText('MethodSelect').click();
    await page.locator('select[name="matchMethodProxy"]').selectOption('POST');
    console.log("Checking Method");

    await page.getByPlaceholder('https://your-webhook-endpoint').fill('https://jsonplaceholder.typicode.com/posts');
    console.log("Successfully");
    await page.getByText('Configure payloadrequest').click();
    await page.locator('#no-transform').selectOption('transform');
    await page.locator('#sendReponse #headers').fill("{\"Content-Type\": \"application/json\"}");
    console.log("header request");
    await page.waitForTimeout(10000); // 10 seconds
    await page.locator('#reqBody').fill("{\"boday\": \"hellow Worl\"}");
    
    await page.getByLabel('Enable dynamic payload').check();
    await page.getByRole('button', { name: ' Save Proxy' }).click();

    console.log('Waiting for the rule to appear...');
    await page.waitForTimeout(5000);

    const ruleExists = await page.isVisible(`text=${SOURCE_PATH}`);
    if (ruleExists) {
      console.log('Validation Passed: Proxy / Callout Rule created successfully.');
    } else {
      console.log('Validation Failed: Checking UI state...');
      await page.screenshot({ path: 'post-save-screenshot.png' });
      console.log('Saved screenshot after attempting to save the rule.');
      throw new Error('Validation Failed: Proxy / Callout Rule creation failed.');
    }

    console.log('Script executed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('Saved screenshot for debugging.');
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();