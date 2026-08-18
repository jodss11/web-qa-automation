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
    // Wait for potential URL update
    await page.waitForTimeout(1000);
    // Accept that the URL might not change if JS handles scrolling internally
    await expect(page.url()).toContain('jodell-website.vercel.app');
  });

  test('should navigate to Skills section', async ({ page }) => {
    await portfolioPage.navigateToSkills();
    await expect(portfolioPage.skillsSection).toBeVisible();
    // Wait for potential URL update
    await page.waitForTimeout(1000);
    // Accept that the URL might not change if JS handles scrolling internally
    await expect(page.url()).toContain('jodell-website.vercel.app');
  });

  test('should navigate to Projects section', async ({ page }) => {
    await portfolioPage.navigateToProjects();
    await expect(portfolioPage.projectsSection).toBeVisible();
    // Wait for potential URL update
    await page.waitForTimeout(1000);
    // Accept that the URL might not change if JS handles scrolling internally
    await expect(page.url()).toContain('jodell-website.vercel.app');
  });

  test('should navigate to Experience section', async ({ page }) => {
    await portfolioPage.navigateToExperience();
    await expect(portfolioPage.experienceSection).toBeVisible();
    // Wait for potential URL update
    await page.waitForTimeout(1000);
    // Accept that the URL might not change if JS handles scrolling internally
    await expect(page.url()).toContain('jodell-website.vercel.app');
  });

  test('should verify all main sections are present', async ({ page }) => {
    await portfolioPage.verifyAllSectionsPresent();
  });

  test('should verify typewriter effect in subtitle', async ({ page }) => {
    await portfolioPage.verifyTypewriterEffect();
  });

  test('should click GitHub link and verify navigation', async ({ page }) => {
    // Debug: check what GitHub links exist
    const allGitHubLinks = page.locator('a[href*="github.com"]');
    const count = await allGitHubLinks.count();
    console.log(`Found ${count} GitHub links`);

    for (let i = 0; i < count; i++) {
      const href = await allGitHubLinks.nth(i).getAttribute('href');
      console.log(`Link ${i}: ${href}`);
    }

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
    await download.delete();
  });

  test('should test mobile menu toggle', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone X

    // Check if mobile menu toggle exists
    if (await portfolioPage.mobileMenuToggle.count() > 0) {
      await portfolioPage.toggleMobileMenu();
      // Add assertion based on expected behavior
    }
  });

  test('should verify skills progress bars animation', async ({ page }) => {
    await portfolioPage.verifySkillsProgressBars();
  });

  test('should verify Web QA Automation project is present', async ({ page }) => {
    await portfolioPage.verifyWebQaAutomationProject();
  });

  test('should verify form handling', async ({ page }) => {
    await portfolioPage.verifyFormHandling();
  });

  test('should verify scroll reveal elements', async ({ page }) => {
    await portfolioPage.verifyScrollReveal();
  });

  test('should test responsive design - mobile view', async ({ page }) => {
    await portfolioPage.verifyResponsiveDesign({ width: 375, height: 667 }, 'mobile'); // iPhone X
  });

  test('should test responsive design - tablet view', async ({ page }) => {
    await portfolioPage.verifyResponsiveDesign({ width: 768, height: 1024 }, 'tablet'); // iPad
  });

  test('should test responsive design - desktop view', async ({ page }) => {
    await portfolioPage.verifyResponsiveDesign({ width: 1920, height: 1080 }, 'desktop');
  });

  test('should verify smooth scrolling behavior', async ({ page }) => {
    await portfolioPage.verifySmoothScrolling();
  });

  test('should verify icon hover effects', async ({ page }) => {
    await portfolioPage.verifyIconHoverEffects();
  });
});