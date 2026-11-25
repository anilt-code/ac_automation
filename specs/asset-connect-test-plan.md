# Asset Connect Test Plan

## Application Overview

Asset Connect is a fleet management web application. This test plan covers login and OTP authentication, Configure module for users and roles, and the core onboarding workflows for drivers, transporters, and vehicles expected for a typical end user. In the current dev environment, the shell loads successfully, but the fleet_management remote is in standby, so the Configure and Onboarding modules are expected to be validated in the connected environment once the remote module is available.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with OTP verification

**File:** `tests/auth/login-success.spec.ts`

**Steps:**
  1. Open https://dev.assetconect.com/ and confirm the login page loads with Email and Password fields.
    - expect: The login screen is visible and includes Email, Password, Remember me, and Sign In controls.
  2. Enter email anil.t@assettl.com and password Ani@12345 and click Sign In.
    - expect: The app proceeds to the OTP verification page for the masked email address.
  3. Enter OTP 123456 into the six digit fields and select Verify OTP.
    - expect: The session is authenticated and the user is redirected to the dashboard.
  4. Check the dashboard header and primary navigation.
    - expect: Dashboard, Configure, Onboarding, Trips, Reports, and More are displayed and clickable.

#### 1.2. Login validation and recovery flow

**File:** `tests/auth/login-validation.spec.ts`

**Steps:**
  1. Leave email and password empty and click Sign In.
    - expect: Validation messages appear for required fields and the form does not submit.
  2. Submit an invalid password or invalid email format.
    - expect: An authentication error is displayed and the user remains on the login/OTP step without creating a valid session.
  3. Click Forgot Password from the login form.
    - expect: The password recovery or reset flow opens and validates email entry before sending or resetting credentials.
  4. Select Remember me and re-open the app if the session persists.
    - expect: The behavior matches product intent without breaking the login flow or retaining stale invalid sessions.

#### 1.3. OTP verification boundary checks

**File:** `tests/auth/otp.spec.ts`

**Steps:**
  1. Load the OTP screen and observe the resend timer and masked email.
    - expect: The 6-digit OTP fields are visible and the masked email is available.
  2. Enter a partial OTP such as 12345 and attempt verification.
    - expect: The Verify OTP button remains disabled or validation indicates the code is incomplete.
  3. Submit an incorrect OTP code.
    - expect: The code is rejected, an error is displayed, and the user does not reach the dashboard.
  4. Use Back to Login from the OTP page.
    - expect: The user returns to the login form without a valid active session.

### 2. Configure - Users and Roles

**Seed:** `tests/seed.spec.ts`

#### 2.1. Open Configure and review user management

**File:** `tests/configure/users-overview.spec.ts`

**Steps:**
  1. From the main navigation click Configure.
    - expect: The Configure module opens, or the expected empty-state/business-error message is shown if the remote module is not connected.
  2. Review the default user and role views.
    - expect: The page displays the relevant management sections, tables, filters, or empty states with no broken layout.
  3. Check search, sort, and pagination behaviors if data is available.
    - expect: Controls are visible and usable without layout or alignment defects.

#### 2.2. Create and validate a user

**File:** `tests/configure/create-user.spec.ts`

**Steps:**
  1. Open the Add User / New User flow in Configure.
    - expect: A create-user form appears with required fields such as name, email, phone, role, and status.
  2. Enter valid user details and assign a valid role.
    - expect: The form accepts the values and no validation errors appear for valid input.
  3. Submit the form.
    - expect: The new user appears in the user list with the assigned role and correct created status.
  4. Attempt duplicate or invalid user data.
    - expect: The system blocks the submission and provides clear inline validation or error feedback.

#### 2.3. Edit, deactivate, and reactivate a user

**File:** `tests/configure/edit-user.spec.ts`

**Steps:**
  1. Select an existing user from the user list.
    - expect: The edit details screen opens with all current values pre-populated.
  2. Modify one or more metadata fields such as phone number, status, or role and save.
    - expect: The updated values persist and are shown in the user list or user detail view.
  3. Deactivate or disable the user if supported by the workflow.
    - expect: The status changes to inactive/disabled and the list updates correctly.
  4. Attempt an invalid update.
    - expect: Validation prevents the save and clear feedback is displayed.

#### 2.4. Create, edit, and delete role permissions

**File:** `tests/configure/roles.spec.ts`

**Steps:**
  1. Open the Roles section in Configure.
    - expect: The roles list or empty state displays actions to create, edit, or delete a role.
  2. Create a role with a unique name and assign relevant permissions.
    - expect: The role is saved and appears with the selected permission set.
  3. Edit an existing role and update permissions.
    - expect: The updated permissions are reflected in the role detail and available assignment options.
  4. Delete a role if it is unused or confirm when it is assigned to active users.
    - expect: The delete flow warns appropriately and either succeeds safely or blocks deletion with a message.

#### 2.5. Assign users to roles and verify access control

**File:** `tests/configure/user-role-assignment.spec.ts`

**Steps:**
  1. Open a user record and edit the assigned role.
    - expect: The role selector or permission panel is populated with available system roles.
  2. Assign a user to a different role and save.
    - expect: The updated role is visible on the user record and in any summary panels.
  3. If role-based access is testable, sign out and sign back in as that user.
    - expect: Only the permitted navigation and actions are available for that role.
  4. Attempt to access a restricted Configure page with insufficient permissions.
    - expect: The app blocks the access and displays an authorization or access-denied message.

### 3. Onboarding - Drivers, Transporters, and Vehicles

**Seed:** `tests/seed.spec.ts`

#### 3.1. Open onboarding dashboard and verify entity categories

**File:** `tests/onboarding/landing.spec.ts`

**Steps:**
  1. Click Onboarding in the main navigation.
    - expect: The onboarding landing page loads and lists the categories Driver, Transporter, and Vehicle.
  2. Inspect the onboarding dashboard for filters, search, breadcrumbs, and empty states.
    - expect: The landing page presents a usable overview of the onboarding queue with no broken controls.
  3. Check the default state before records are added.
    - expect: The system shows zero records or a clear empty state for the onboarding categories.

#### 3.2. Driver onboarding lifecycle

**File:** `tests/onboarding/driver.spec.ts`

**Steps:**
  1. Select Driver onboarding and click Add Driver or New Driver.
    - expect: A driver onboarding form opens with required fields such as name, license number, phone, status, and emergency contact.
  2. Submit incomplete driver details.
    - expect: Required-field and format validation prevent the form from submitting.
  3. Enter valid driver details and attach any required documents, then save.
    - expect: The driver record is created and appears in the list with a valid status.
  4. Edit a saved driver record and update its details.
    - expect: The changes persist and the record remains visible with updated information.

#### 3.3. Transporter onboarding lifecycle

**File:** `tests/onboarding/transporter.spec.ts`

**Steps:**
  1. Select Transporter onboarding and create a new transporter record.
    - expect: The transporter form opens with fields such as company name, registration number, contact details, legal documents, and address.
  2. Submit a transporter form with missing mandatory fields or invalid documents.
    - expect: The form blocks submission and shows clear validation or file-format errors.
  3. Complete the transporter details with valid data and save.
    - expect: A new transporter record is created and shown with a status and metadata.
  4. Review and approve or reject the transporter record.
    - expect: Status changes are persisted and visible in the onboarding list and detail view.

#### 3.4. Vehicle onboarding lifecycle

**File:** `tests/onboarding/vehicle.spec.ts`

**Steps:**
  1. Select Vehicle onboarding and click Add Vehicle.
    - expect: A vehicle onboarding form opens with required fields such as registration number, make, model, year, capacity, ownership, and compliance details.
  2. Submit incomplete vehicle data.
    - expect: The system prevents save and highlights missing or invalid values.
  3. Enter valid vehicle data and attach any required documents or permits, then save.
    - expect: The vehicle appears in the onboarding queue or list with the expected assigned status.
  4. Edit the vehicle record and update registration or ownership details.
    - expect: The new values are saved and visible in the list and the record detail page.

#### 3.5. Onboarding workflow validation and status transitions

**File:** `tests/onboarding/workflow.spec.ts`

**Steps:**
  1. Open each onboarding category and review record statuses.
    - expect: Statuses such as Pending, In Review, Approved, and Rejected are displayed consistently.
  2. Use search or filters to find a driver, transporter, or vehicle by name, ID, or registration number.
    - expect: The result set matches the filter criteria and the selected record opens correctly.
  3. Attempt to approve a record missing required documents or missing critical fields.
    - expect: The system blocks the transition and asks for the required information.
  4. Confirm approved or rejected onboarding outcomes are visible to relevant users.
    - expect: The updated status is persisted and visible in list and detail views to the appropriate roles.
