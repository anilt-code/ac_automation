import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { BASE_URL } from '../utils/config';
import { LOGIN_LOCATORS } from '../locators/login.locators';

// This class represents the login page.
// It keeps login-page elements and login actions in one place.
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) 
  {
    super(page);

    // Page element locators come from the locator file.
    this.emailInput = page.locator(LOGIN_LOCATORS.email);
    this.passwordInput = page.locator(LOGIN_LOCATORS.password);
    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.forgotPasswordLink = page.getByRole('button', { name: 'Forgot Password?' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  // Open the login page and wait until the email field is visible.
  async goto() {
    await this.page.goto(`${BASE_URL}/login`);
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  // Enter email and password, then click Sign In.
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // Login action with the Remember Me option selected.
  async loginWithRememberMe(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.signInButton.click();
  }

  // Open the Forgot Password page.
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  // Wait until the main login elements are visible.
  async expectVisible() {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.signInButton.waitFor({ state: 'visible' });
  }

  // Clear old login information before starting the next Excel row.
  async resetSession() {
    await this.page.context().clearCookies();

    try {
      await this.page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch {
      // Storage clearing is not available on about:blank.
    }
  }
}
