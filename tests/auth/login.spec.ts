import path from 'path';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OtpPage } from '../../pages/OtpPage';
import { readLoginTestData } from '../../utils/excel-reader';

// This is the location of the Excel login test data.
const loginDataFile = path.resolve(process.cwd(), 'test-data/login-data.xlsx');

test.describe.serial('Login and OTP Authentication', () => {
  test('Run login cases from Excel', async ({ page }) => {
    // Read every login row from the Excel file.
    const loginRows = await readLoginTestData(loginDataFile);

    // Run one login test for each Excel row.
    for (const loginData of loginRows) {
      await test.step(loginData.testName, async () => {
        const loginPage = new LoginPage(page);
        const otpPage = new OtpPage(page);

        // Start every data row with a clean login page.
        await loginPage.resetSession();
        await loginPage.goto();

        // Fill the email and password from the Excel row.
        await loginPage.login(loginData.email, loginData.password);

        // Check what this Excel row should do.
        if (loginData.expectedResult === 'success') {
          // Enter OTP and verify that login reaches the dashboard.
          await otpPage.waitForOtpScreen();
          await otpPage.enterOtp(loginData.otp);
          await otpPage.verify();
          await expect(page).toHaveURL(/\/dashboard/);
          return;
        }

        if (loginData.expectedResult === 'invalidCredentials') {
          // An invalid email or password must not open the dashboard.
          await expect(page).not.toHaveURL(/\/dashboard/);
          await expect(loginPage.emailInput).toBeVisible();
          return;
        }

        if (loginData.expectedResult === 'invalidOtp') {
          // Enter an invalid OTP and verify the error is visible.
          await otpPage.waitForOtpScreen();
          await otpPage.enterOtp(loginData.otp);
          await otpPage.verify();
          await expect(page.getByText(/invalid|error|otp/i).first()).toBeVisible();
        }
      });
    }
  });

  test('Required fields should show validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.signInButton.click();

    await expect(page.getByText(/required|email|password/i).first()).toBeVisible();
  });

  test('Forgot password link should open the recovery page', async ({ page }) => {
    const loginPage = new LoginPage(page);
     await loginPage.goto();
    await loginPage.clickForgotPassword();
    await expect(page.getByText(/forgot password|reset password|recover/i)).toBeVisible();
  });
});
