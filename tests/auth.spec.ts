
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should allow a user to sign up with email and password', async ({ page }) => {
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';

    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign Up")');

    await page.waitForNavigation();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should allow a user to sign in with email and password', async ({ page }) => {
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';

    // First, sign up the user
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign Up")');
    await page.waitForNavigation();
    await expect(page).toHaveURL('/dashboard');

    // Then, sign out
    await page.click('button:has-text("Sign Out")');
    await page.waitForNavigation();
    await expect(page).toHaveURL('/login');

    // Finally, sign in
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign In")');
    await page.waitForNavigation();
    await expect(page).toHaveURL('/dashboard');
  });
});
