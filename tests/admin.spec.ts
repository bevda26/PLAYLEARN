
import { test, expect } from '@playwright/test';

// NOTE: These tests rely on the fact that the application state is not persisted
// across page loads in the test environment. We simulate being logged in or out
// by the presence or absence of certain UI elements that depend on the auth context.

test.describe('Admin Role Access Control', () => {

  test('Non-Admin user should NOT see admin links and should be denied access', async ({ page }) => {
    // A non-admin user is the default state when visiting the site without logging in.
    await page.goto('/');

    // 1. Check that the "Quest Builder" link is NOT in the header
    await expect(page.locator('header').getByText('Quest Builder')).toBeHidden();

    // 2. Attempt to navigate directly to the admin page
    await page.goto('/admin/quest-builder');

    // 3. Verify the "Access Denied" message is shown
    await expect(page.getByRole('heading', { name: 'Access Denied' })).toBeVisible();
    await expect(page.getByText('You do not have the necessary permissions to view this page.')).toBeVisible();

    // 4. Verify the builder tools are NOT present
    await expect(page.getByRole('heading', { name: 'The PlayLearn Builder' })).toBeHidden();
  });

  // This test requires manual setup:
  // 1. Set the NEXT_PUBLIC_ADMIN_USER_ID in a .env.local file
  // 2. Log in as that user in the browser before running tests.
  // Playwright's auth state can be saved to a file to automate this.
  test.skip('Admin user should see admin links and be granted access', async ({ page }) => {
    // This test assumes you have already logged in as the admin user and saved the auth state.
    // await page.context().storageState({ path: 'admin-auth-state.json' });

    await page.goto('/');

    // 1. Check that the "Quest Builder" link IS in the header
    const questBuilderLink = page.locator('header').getByText('Quest Builder');
    await expect(questBuilderLink).toBeVisible();

    // 2. Click the link to navigate to the admin page
    await questBuilderLink.click();

    // 3. Verify the URL is correct
    await expect(page).toHaveURL('/admin/quest-builder');

    // 4. Verify the "Access Denied" message is NOT shown
    await expect(page.getByRole('heading', { name: 'Access Denied' })).toBeHidden();
    
    // 5. Verify the builder tools ARE present
    await expect(page.getByRole('heading', { name: 'The PlayLearn Builder' })).toBeVisible();
    await expect(page.getByText('Step 1: AI-Powered Generation')).toBeVisible();
  });
});
