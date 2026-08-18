import { Page, Locator, expect } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;

  // Navigation links
  readonly aboutLink: Locator;
  readonly skillsLink: Locator;
  readonly projectsLink: Locator;
  readonly experienceLink: Locator;

  // External links (specific to nav/footer social links)
  readonly githubLink: Locator;
  readonly jobstreetLink: Locator;
  readonly linkedinLink: Locator;
  readonly downloadResumeLink: Locator;

  // Sections
  readonly heroSection: Locator;
  readonly summarySection: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;
  readonly experienceSection: Locator;
  readonly educationSection: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation links
    this.aboutLink = page.locator('nav a[href="#summary"]');
    this.skillsLink = page.locator('nav a[href="#skills"]');
    this.projectsLink = page.locator('nav a[href="#projects"]');
    this.experienceLink = page.locator('nav a[href="#experience"]');

    // External links (social/profile links)
    this.githubLink = page.locator('a[href*="github.com"]:not([href*="/security-inventory-qa"]):not([href*="/selenium_automation"]):not([href*="/qa-practice-site"]):not([href*="/qa-automation-portfolio"])');
    this.jobstreetLink = page.locator('a[href*="jobstreet.com"]');
    this.linkedinLink = page.locator('a[href*="linkedin.com"]');
    this.downloadResumeLink = page.locator('a[href*=".pdf"]');

    // Sections
    this.heroSection = page.locator('#hero');
    this.summarySection = page.locator('#summary');
    this.skillsSection = page.locator('#skills');
    this.projectsSection = page.locator('#projects');
    this.experienceSection = page.locator('#experience');
    this.educationSection = page.locator('#education');
  }

  async goto() {
    await this.page.goto('https://jodell-website.vercel.app/');
  }

  async navigateToAbout() {
    await this.aboutLink.click();
    await this.summarySection.isVisible();
  }

  async navigateToSkills() {
    await this.skillsLink.click();
    await this.skillsSection.isVisible();
  }

  async navigateToProjects() {
    await this.projectsLink.click();
    await this.projectsSection.isVisible();
  }

  async navigateToExperience() {
    await this.experienceLink.click();
    await this.experienceSection.isVisible();
  }

  async clickGitHubLink() {
    await this.githubLink.click();
  }

  async clickJobStreetLink() {
    await this.jobstreetLink.click();
  }

  async clickLinkedInLink() {
    await this.linkedinLink.click();
  }

  async clickDownloadResume() {
    await this.downloadResumeLink.click();
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Portfolio|Jodie/);
  }

  async verifyHeroSection() {
    await expect(this.heroSection).toBeVisible();
    await expect(this.page.locator('h1')).toContainText('Jodell');
  }

  async verifyAllSectionsPresent() {
    await expect(this.summarySection).toBeVisible();
    await expect(this.skillsSection).toBeVisible();
    await expect(this.projectsSection).toBeVisible();
    await expect(this.experienceSection).toBeVisible();
    await expect(this.educationSection).toBeVisible();
  }
}