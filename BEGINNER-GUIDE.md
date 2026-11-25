# Beginner Playwright Guide

## What happens when the test runs

1. Playwright starts a browser.
2. `login.spec.ts` asks the Excel reader to open `test-data/login-data.xlsx`.
3. The test reads each Excel row one at a time.
4. `LoginPage` opens the login page and types email/password.
5. `OtpPage` types and verifies the OTP when the row needs it.
6. Playwright checks whether the result matches `expectedResult`.

## Excel columns

| Column | Meaning |
|---|---|
| testName | Name shown in the test report |
| email | Email entered on the login page |
| password | Password entered on the login page |
| otp | OTP used for successful or invalid OTP rows |
| expectedResult | `success`, `invalidCredentials`, or `invalidOtp` |

## File responsibilities

- `utils/config.ts`: base URL and static test values
- `locators/login.locators.ts`: login and OTP selectors
- `utils/excel-reader.ts`: reads data from Excel
- `pages/LoginPage.ts`: login-page actions
- `pages/OtpPage.ts`: OTP-page actions
- `tests/auth/login.spec.ts`: test scenarios and assertions

## To add a login row

1. Open `test-data/login-data.xlsx`.
2. Add a new row.
3. Fill all five columns.
4. Run:

```bash
npm run test:login:headed
```

## To add a new page later

Create these three items:

1. `locators/<page>.locators.ts`
2. `pages/<Page>Page.ts`
3. `tests/<module>/<page>.spec.ts`

Keep locators, page actions, test data, and test assertions in separate files.
