import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { OTP_LOCATORS } from '../locators/login.locators';

// This class represents the OTP verification page.
export class OtpPage extends BasePage {
  readonly otpField1: Locator;
  readonly otpField2: Locator;
  readonly otpField3: Locator;
  readonly otpField4: Locator;
  readonly otpField5: Locator;
  readonly otpField6: Locator;
  readonly verifyOtpButton: Locator;
  readonly backToLoginLink: Locator;

  constructor(page: Page) {
    super(page);

    // Find the six OTP boxes and the Verify OTP button.
    this.otpField1 = page.locator(OTP_LOCATORS.digit1);
    this.otpField2 = page.locator(OTP_LOCATORS.digit2);
    this.otpField3 = page.locator(OTP_LOCATORS.digit3);
    this.otpField4 = page.locator(OTP_LOCATORS.digit4);
    this.otpField5 = page.locator(OTP_LOCATORS.digit5);
    this.otpField6 = page.locator(OTP_LOCATORS.digit6);
    this.verifyOtpButton = page.locator(OTP_LOCATORS.verifyOtpButton);
    this.backToLoginLink = page.locator(OTP_LOCATORS.backToLoginLink);
  }

  // Wait until the first OTP box is visible.
  async waitForOtpScreen() {
    await this.otpField1.waitFor({ state: 'visible' });
  }

  // Split one OTP value such as "123456" and enter one digit in each box.
  async enterOtp(otp: string) {
    if (otp.length !== 6) {
      throw new Error(`OTP must contain exactly 6 digits. Received: "${otp}"`);
    }

    await this.otpField1.fill(otp[0]);
    await this.otpField2.fill(otp[1]);
    await this.otpField3.fill(otp[2]);
    await this.otpField4.fill(otp[3]);
    await this.otpField5.fill(otp[4]);
    await this.otpField6.fill(otp[5]);
  }

  // Click the Verify OTP button.
  async verify() {
    await this.verifyOtpButton.click();
  }

  // Return from the OTP page to the login page.
  async backToLogin() {
    await this.backToLoginLink.click();
  }
}
