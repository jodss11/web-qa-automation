import { Page, Locator, expect } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;

  // Navigation links (in header nav)
  readonly aboutLink: Locator;
  readonly skillsLink: Locator;
  readonly projectsLink: Locator;
  readonly experienceLink: Locator;
  readonly logoLink: Locator;

  // External links (in projects section)
  readonly securityInventoryQaLink: Locator;
  readonly seleniumAutomationLink: Locator;
  readonly qaPracticeSiteLink: Locator;
  readonly qaAutomationPortfolioLink: Locator;
  readonly webQaAutomationLink: Locator;

  // Sections
  readonly heroSection: Locator;
  readonly summarySection: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;
  readonly experienceSection: Locator;
  readonly educationSection: Locator;
  readonly subtitleElement: Locator;

  // Skills content
  readonly languagesSection: Locator;
  readonly frameworksSection: Locator;
  readonly conceptsSection: Locator;

  // Project categories
  readonly qaAutomationProjectCategory: Locator;
  readonly ticketlyMobileProjectCategory: Locator;
  readonly iotRoboticsProjectCategory: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation links (in header nav)
    this.logoLink = page.locator('nav a[href="#hero"]');
    this.aboutLink = page.locator('nav ul li a[href="#summary"]');
    this.skillsLink = page.locator('nav ul li a[href="#skills"]');
    this.projectsLink = page.locator('nav ul li a[href="#projects"]');
    this.experienceLink = page.locator('nav ul li a[href="#experience"]');

    // External links (in projects section - QA Automation & Testing)
    this.securityInventoryQaLink = page.locator('#projects .project-link[href*="security-inventory-qa"]');
    this.seleniumAutomationLink = page.locator('#projects .project-link[href*="selenium_automation"]');
    this.qaPracticeSiteLink = page.locator('#projects .project-link[href*="qa-practice-site"]');
    this.qaAutomationPortfolioLink = page.locator('#projects .project-link[href*="qa-automation-portfolio"]');
    this.webQaAutomationLink = page.locator('#projects .project-link[href*="web-qa-automation"]');

    // Sections
    this.heroSection = page.locator('#hero');
    this.summarySection = page.locator('#summary');
    this.skillsSection = page.locator('#skills');
    this.projectsSection = page.locator('#projects');
    this.experienceSection = page.locator('#experience');
    this.educationSection = page.locator('#education');

    // Skills content
    this.languagesSection = page.locator('#skills .skill-box:has(h3:has-text("Languages")) p');
    this.frameworksSection = page.locator('#skills .skill-box:has(h3:has-text("Frameworks & Tech")) p');
    this.conceptsSection = page.locator('#skills .skill-box:has(h3:has-text("Concepts & Domains")) p');

    // Project categories
    this.qaAutomationProjectCategory = page.locator('#projects h3:has-text("QA Automation & Testing")');
    this.ticketlyMobileProjectCategory = page.locator('#projects h3:has-text("Ticketly & Mobile Application Suite")');
    this.iotRoboticsProjectCategory = page.locator('#projects h3:has-text("IoT & Robotics Systems")');

    // Subtitle element
    this.subtitleElement = page.locator('#hero .subtitle');
  }

  async goto() {
    await this.page.goto('https://jodell-website.vercel.app/');
  }

  async navigateToAbout() {
    await this.aboutLink.click({ force: true });
    await this.summarySection.waitFor({ state: 'visible' });
  }

  async navigateToSkills() {
    await this.skillsLink.click({ force: true });
    await this.skillsSection.waitFor({ state: 'visible' });
  }

  async navigateToProjects() {
    await this.projectsLink.click({ force: true });
    await this.projectsSection.waitFor({ state: 'visible' });
  }

  async navigateToExperience() {
    await this.experienceLink.click({ force: true });
    await this.experienceSection.waitFor({ state: 'visible' });
  }

  async clickLogo() {
    await this.logoLink.click({ force: true });
  }

  async clickSecurityInventoryQa() {
    await this.securityInventoryQaLink.click({ force: true });
  }

  async clickSeleniumAutomation() {
    await this.seleniumAutomationLink.click({ force: true });
  }

  async clickQaPracticeSite() {
    await this.qaPracticeSiteLink.click({ force: true });
  }

  async clickQaAutomationPortfolio() {
    await this.qaAutomationPortfolioLink.click({ force: true });
  }

  async clickWebQaAutomation() {
    await this.webQaAutomationLink.click({ force: true });
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Portfolio|Jodie/);
  }

  async verifyHeroSection() {
    await expect(this.heroSection).toBeVisible();
    await expect(this.page.locator('h1')).toContainText('Jodell');
  }

  async verifySkillsContent() {
    // Verify skills section has the expected content structure
    await expect(this.languagesSection).toBeVisible();
    await expect(this.frameworksSection).toBeVisible();
    await expect(this.conceptsSection).toBeVisible();

    // Check for expected technologies
    const languagesText = await this.languagesSection.textContent();
    const frameworksText = await this.frameworksSection.textContent();
    const conceptsText = await this.conceptsSection.textContent();

    expect(languagesText).toContain('Java');
    expect(languagesText).toContain('Python');
    expect(frameworksText).toContain('Playwright');
    expect(frameworksText).toContain('TypeScript');
    expect(frameworksText).toContain('Selenium');
    expect(frameworksText).toContain('Flutter');
    expect(conceptsText).toContain('QA Automation');
    expect(conceptsText).toContain('Networking');
  }

  async verifyAllSectionsPresent() {
    await expect(this.summarySection).toBeVisible();
    await expect(this.skillsSection).toBeVisible();
    await expect(this.projectsSection).toBeVisible();
    await expect(this.experienceSection).toBeVisible();
    await expect(this.educationSection).toBeVisible();
  }

  async verifyProjectsSection() {
    await expect(this.projectsSection).toBeVisible();
    await expect(this.qaAutomationProjectCategory).toBeVisible();
    await expect(this.ticketlyMobileProjectCategory).toBeVisible();
    await expect(this.iotRoboticsProjectCategory).toBeVisible();

    // Verify the Web QA Automation project link exists
    await expect(this.webQaAutomationLink).toBeVisible();
    await expect(this.webQaAutomationLink).toHaveAttribute('href', /github\.com\/jodss11\/web-qa-automation/);
  }

  async verifyExternalLinks() {
    // Verify all the external project links exist and have correct hrefs
    await expect(this.securityInventoryQaLink).toBeVisible();
    await expect(this.securityInventoryQaLink).toHaveAttribute('href', /github\.com\/jodss11\/security-inventory-qa/);

    await expect(this.seleniumAutomationLink).toBeVisible();
    await expect(this.seleniumAutomationLink).toHaveAttribute('href', /github\.com\/jodss11\/selenium_automation/);

    await expect(this.qaPracticeSiteLink).toBeVisible();
    await expect(this.qaPracticeSiteLink).toHaveAttribute('href', /github\.com\/jodss11\/qa-practice-site/);

    await expect(this.qaAutomationPortfolioLink).toBeVisible();
    await expect(this.qaAutomationPortfolioLink).toHaveAttribute('href', /github\.com\/jodss11\/qa-automation-portfolio/);

    await expect(this.webQaAutomationLink).toBeVisible();
    await expect(this.webQaAutomationLink).toHaveAttribute('href', /github\.com\/jodss11\/web-qa-automation/);
  }

  async verifyResponsiveDesign(viewport: { width: number; height: number }, name: string) {
    await this.page.setViewportSize(viewport);
    await this.page.waitForTimeout(500); // Allow time for responsive adjustments

    await this.verifyHeroSection();
    await this.verifyAllSectionsPresent();
  }
}