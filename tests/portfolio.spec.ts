import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Portfolio Website Functionality Tests', () => {
  let portfolioPage: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();
  });

  test('should load the portfolio page successfully', async ({ page }) => {
    await portfolioPage.verifyPageTitle();
    await portfolioPage.verifyHeroSection();
  });

  test('should navigate to About section', async ({ page }) => {
    await portfolioPage.navigateToAbout();
    await expect(portfolioPage.summarySection).toBeVisible();
    await expect(page).toHaveURL(/#summary/);
  });

  test('should navigate to Skills section', async ({ page }) => {
    await portfolioPage.navigateToSkills();
    await expect(portfolioPage.skillsSection).toBeVisible();
    await expect(page).toHaveURL(/#skills/);
  });

  test('should navigate to Projects section', async ({ page }) => {
    await portfolioPage.navigateToProjects();
    await expect(portfolioPage.projectsSection).toBeVisible();
    await expect(page).toHaveURL(/#projects/);
  });

  test('should navigate to Experience section', async ({ page }) => {
    await portfolioPage.navigateToExperience();
    await expect(portfolioPage.experienceSection).toBeVisible();
    await expect(page).toHaveURL(/#experience/);
  });

  test('should verify all main sections are present', async ({ page }) => {
    await portfolioPage.verifyAllSectionsPresent();
  });

  test('should click GitHub link and verify navigation', async ({ page }) => {
    // Wait for the link and click it
    await portfolioPage.clickGitHubLink();

    // Check if it opened a new tab/popup
    const pages = page.context().pages();
    if (pages.length > 1) {
      // New tab was opened
      const newPage = pages[pages.length - 1];
      await expect(newPage).toHaveURL(/github\.com\/jodss11/);
      await newPage.close();
    } else {
      // Same tab navigation - go back
      await expect(page).toHaveURL(/github\.com\/jodss11/);
      await page.goBack();
    }
  });

  test('should click JobStreet link and verify navigation', async ({ page }) => {
    // Wait for the link and click it
    await portfolioPage.clickJobStreetLink();

    // Check if it opened a new tab/popup
    const pages = page.context().pages();
    if (pages.length > 1) {
      // New tab was opened
      const newPage = pages[pages.length - 1];
      await expect(newPage).toHaveURL(/jobstreet\.com/);
      await newPage.close();
    } else {
      // Same tab navigation - go back
      await expect(page).toHaveURL(/jobstreet\.com/);
      await page.goBack();
    }
  });

  test('should click LinkedIn link and verify navigation', async ({ page }) => {
    // Wait for the link and click it
    await portfolioPage.clickLinkedInLink();

    // Check if it opened a new tab/popup
    const pages = page.context().pages();
    if (pages.length > 1) {
      // New tab was opened
      const newPage = pages[pages.length - 1];
      await expect(newPage).toHaveURL(/linkedin\.com/);
      await newPage.close();
    } else {
      // Same tab navigation - go back
      await expect(page).toHaveURL(/linkedin\.com/);
      await page.goBack();
    }
  });

  test('should initiate resume download', async ({ page }) => {
    // Wait for the download and click
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      portfolioPage.clickDownloadResume()
    ]);

    const suggestedFilename = download.suggestedFilename();
    expect(suggestedFilename).toContain('.pdf');

    // Clean up the download
    await deleteAsync(download.path());
  });

  test('should test responsive design - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone X
    await portfolioPage.verifyHeroSection();
    await portfolioPage.verifyAllSectionsPresent();
  });

  test('should test responsive design - tablet view', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await portfolioPage.verifyHeroSection();
    await portfolioPage.verifyAllSectionsPresent();
  });

  test('should test responsive design - desktop view', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await portfolioPage.verifyHeroSection();
    await portfolioPage.verifyAllSectionsPresent();
  });
});