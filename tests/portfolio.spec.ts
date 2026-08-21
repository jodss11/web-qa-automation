import { test, expect } from "@playwright/test";
import { PortfolioPage } from "../pages/PortfolioPage";

test.describe("Portfolio Website Functionality Tests", () => {
  let portfolioPage: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();
  });

  test("should load the portfolio page successfully", async ({ page }) => {
    await portfolioPage.verifyPageTitle();
    await portfolioPage.verifyHeroSection();
  });

  test("should navigate to About section", async ({ page }) => {
    await portfolioPage.navigateToAbout();
    await expect(portfolioPage.summarySection).toBeVisible();
    // For now, just verify we can navigate and the section is visible
    // The URL handling depends on how the site implements scrolling
  });

  test("should navigate to Skills section", async ({ page }) => {
    await portfolioPage.navigateToSkills();
    await expect(portfolioPage.skillsSection).toBeVisible();
  });

  test("should navigate to Projects section", async ({ page }) => {
    await portfolioPage.navigateToProjects();
    await expect(portfolioPage.projectsSection).toBeVisible();
  });

  test("should navigate to Experience section", async ({ page }) => {
    await portfolioPage.navigateToExperience();
    await expect(portfolioPage.experienceSection).toBeVisible();
  });

  test("should verify all main sections are present", async ({ page }) => {
    await portfolioPage.verifyAllSectionsPresent();
  });

  test("should verify subtitle contains expected content", async ({ page }) => {
    await portfolioPage.verifyHeroSection();

    // Wait for subtitle element to be present and get text content
    await expect(portfolioPage.subtitleElement).toBeVisible({ timeout: 5000 });
    const subtitleText = await portfolioPage.subtitleElement.textContent();

    // Verify we get subtitle text (whether animated or static)
    expect(subtitleText?.length).toBeGreaterThan(0);
    // Log what we found for debugging
    console.log(`Subtitle text found: "${subtitleText?.trim()}"`);
  });

  test("should click logo and verify navigation", async ({ page }) => {
    await portfolioPage.clickLogo();
    await expect(page.locator('#hero')).toBeVisible();
  });

  test("should click Security Inventory QA link and verify navigation", async ({
    page,
  }) => {
    // Wait for potential new page and click the link
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      portfolioPage.clickSecurityInventoryQa(),
    ]);

    if (newPage) {
      // New tab was opened
      await expect(newPage).toHaveURL(
        /github\.com\/jodss11\/security-inventory-qa/,
      );
      await newPage.close();
    } else {
      // Fallback: check if navigation happened in same tab
      await expect(page).toHaveURL(
        /github\.com\/jodss11\/security-inventory-qa/,
      );
      await page.goBack();
    }
  });

  test("should click Selenium Automation link and verify navigation", async ({
    page,
  }) => {
    // Wait for potential new page and click the link
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      portfolioPage.clickSeleniumAutomation(),
    ]);

    if (newPage) {
      // New tab was opened
      await expect(newPage).toHaveURL(
        /github\.com\/jodss11\/selenium_automation/,
      );
      await newPage.close();
    } else {
      // Fallback: check if navigation happened in same tab
      await expect(page).toHaveURL(/github\.com\/jodss11\/selenium_automation/);
      await page.goBack();
    }
  });

  test("should click QA Practice Site link and verify navigation", async ({
    page,
  }) => {
    // Wait for potential new page and click the link
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      portfolioPage.clickQaPracticeSite(),
    ]);

    if (newPage) {
      // New tab was opened
      await expect(newPage).toHaveURL(/github\.com\/jodss11\/qa-practice-site/);
      await newPage.close();
    } else {
      // Fallback: check if navigation happened in same tab
      await expect(page).toHaveURL(/github\.com\/jodss11\/qa-practice-site/);
      await page.goBack();
    }
  });

  test("should click QA Automation Portfolio link and verify navigation", async ({
    page,
  }) => {
    // Wait for potential new page and click the link
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      portfolioPage.clickQaAutomationPortfolio(),
    ]);

    if (newPage) {
      // New tab was opened
      await expect(newPage).toHaveURL(
        /github\.com\/jodss11\/qa-automation-portfolio/,
      );
      await newPage.close();
    } else {
      // Fallback: check if navigation happened in same tab
      await expect(page).toHaveURL(
        /github\.com\/jodss11\/qa-automation-portfolio/,
      );
      await page.goBack();
    }
  });

  test("should click Web QA Automation link and verify navigation", async ({
    page,
  }) => {
    // Wait for potential new page and click the link
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      portfolioPage.clickWebQaAutomation(),
    ]);

    if (newPage) {
      // New tab was opened
      await expect(newPage).toHaveURL(
        /github\.com\/jodss11\/web-qa-automation/,
      );
      await newPage.close();
    } else {
      // Fallback: check if navigation happened in same tab
      await expect(page).toHaveURL(/github\.com\/jodss11\/web-qa-automation/);
      await page.goBack();
    }
  });

  test("should verify skills section content", async ({ page }) => {
    await portfolioPage.navigateToSkills();
    await expect(portfolioPage.skillsSection).toBeVisible();
    await portfolioPage.verifySkillsContent();
  });

  test("should verify projects section structure", async ({ page }) => {
    await portfolioPage.navigateToProjects();
    await expect(portfolioPage.projectsSection).toBeVisible();
    await portfolioPage.verifyProjectsSection();
  });

  test("should verify external project links", async ({ page }) => {
    await portfolioPage.navigateToProjects();
    await expect(portfolioPage.projectsSection).toBeVisible();
    await portfolioPage.verifyExternalLinks();
  });

  test("should test responsive design - mobile view", async ({ page }) => {
    await portfolioPage.verifyResponsiveDesign(
      { width: 375, height: 667 },
      "mobile",
    ); // iPhone X
  });

  test("should test responsive design - tablet view", async ({ page }) => {
    await portfolioPage.verifyResponsiveDesign(
      { width: 768, height: 1024 },
      "tablet",
    ); // iPad
  });

  test("should test responsive design - desktop view", async ({ page }) => {
    await portfolioPage.verifyResponsiveDesign(
      { width: 1920, height: 1080 },
      "desktop",
    );
  });
});
