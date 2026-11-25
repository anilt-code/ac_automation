// Selectors used only by the LoginPage.
export const LOGIN_LOCATORS = {
  email: 'input[formcontrolname="email"], input[type="email"]',
  password: 'input#password, input[formcontrolname="password"]',
  signInButton: 'button:has-text("Sign In")',
  rememberMe: 'input[type="checkbox"]',
  forgotPassword: 'button:has-text("Forgot Password?")',
};

// Selectors used only by the OtpPage.
export const OTP_LOCATORS = {
  digit1: 'input[aria-label="Digit 1"]',
  digit2: 'input[aria-label="Digit 2"]',
  digit3: 'input[aria-label="Digit 3"]',
  digit4: 'input[aria-label="Digit 4"]',
  digit5: 'input[aria-label="Digit 5"]',
  digit6: 'input[aria-label="Digit 6"]',
  verifyOtpButton: 'button:has-text("Verify OTP")',
  backToLoginLink: 'a:has-text("Back to Login")',
};
