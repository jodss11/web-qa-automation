import { Page, Locator, expect } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;

  // Navigation links
  readonly aboutLink: Locator;
  readonly skillsLink: Locator;
  readonly projectsLink: Locator;
  readonly experienceLink: Locator;
  readonly mobileMenuToggle: Locator;
  readonly mobileMenu: Locator;

  // External links
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

  // Typewriter effect
  readonly subtitleElement: Locator;

  // Skills progress bars
  readonly skillsProgressBars: Locator;
  readonly langProgressBars: Locator;
  readonly frameworksProgressBars: Locator;
  readonly conceptsProgressBars: Locator;

  // Project cards
  readonly webQaAutomationProject: Locator;

  // Form elements
  readonly contactForm: Locator;
  readonly formSubmitButton: Locator;

  // Scroll reveal elements
  readonly scrollRevealElements: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation links
    this.aboutLink = page.locator('nav a[href="#summary"]');
    this.skillsLink = page.locator('nav a[href="#skills"]');
    this.projectsLink = page.locator('nav a[href="#projects"]');
    this.experienceLink = page.locator('nav a[href="#experience"]');

    // Mobile menu
    this.mobileMenuToggle = page.locator('.mobile-menu-toggle, .hamburger, [aria-label*="menu" i], .menu-toggle, button[class*="menu"]');
    this.mobileMenu = page.locator('.mobile-menu, .nav-menu-mobile, nav[aria-expanded="true"], .menu-open');

    // External links - primary GitHub profile link (the first one in nav/footer)
    this.githubLink = page.locator('nav a[href="https://github.com/jodss11"], footer a[href="https://github.com/jodss11"]');
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

    // Typewriter effect - specifically the animated subtitle in hero section
    this.subtitleElement = page.locator('#hero .subtitle, .hero .subtitle').first();

    // Skills progress bars
    this.skillsProgressBars = page.locator('.skills-progress, .progress-bar, .skill-bar, .progress');
    this.langProgressBars = page.locator('#skills .progress-bar-lang, .languages .progress-bar, [data-skill*="language"] .progress-bar');
    this.frameworksProgressBars = page.locator('#skills .progress-bar-framework, .frameworks .progress-bar, [data-skill*="framework"] .progress-bar');
    this.conceptsProgressBars = page.locator('#skills .progress-bar-concept, .concepts .progress-bar, [data-skill*="concept"] .progress-bar');

    // Project cards
    this.webQaAutomationProject = page.locator('[data-project="web-qa-automation"], .project-card:has-text("Web QA Automation"), .project:has-text("Playwright-based test automation"), .project:has-text(" webdriver"), .project-card:has-text("QA Automation & Testing")');

    // Form elements
    this.contactForm = page.locator('form, #contact-form, .contact-form, [role="form"]');
    this.formSubmitButton = page.locator('form button[type="submit"], #contact-form button, .contact-form button, input[type="submit"], button:has-text("Send"), button:has-text("Submit")');

    // Scroll reveal elements
    this.scrollRevealElements = page.locator('[data-scroll-reveal], .scroll-reveal, .reveal-on-scroll, [class*="reveal"], [class*="animate"]');
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

  async toggleMobileMenu() {
    await this.mobileMenuToggle.click();
    // Wait for menu to be visible or hidden based on current state
    await this.page.waitForTimeout(300);
  }

  async isMobileMenuOpen() {
    return await this.mobileMenu.isVisible();
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Portfolio|Jodie/);
  }

  async verifyHeroSection() {
    await expect(this.heroSection).toBeVisible();
    await expect(this.page.locator('h1')).toContainText('Jodell');
  }

  async verifyTypewriterEffect() {
    // Wait for typewriter effect to complete
    await this.subtitleElement.waitFor({ state: 'visible', timeout: 5000 });
    // Check if it contains expected text patterns
    const subtitleText = await this.subtitleElement.textContent();
    expect(subtitleText).toContain('QA Engineer');
    expect(subtitleText).toContain('Software Developer');
    expect(subtitleText).toContain('IoT Specialist');
  }

  async verifyActiveNavigation(section: string) {
    // Check for active class or aria-current attribute
    const activeNavLink = this.page.locator(`nav a[href="#${section.toLowerCase()}"]`);
    await expect(activeNavLink).toHaveClass(/active|current/);
  }

  async verifySkillsProgressBars() {
    // Wait for skills section to be visible
    await this.skillsSection.isVisible();
    await this.page.waitForTimeout(1000); // Allow time for animations

    // Check that progress bars exist
    const progressBars = await this.skillsProgressBars.all();
    expect(progressBars.length).toBeGreaterThan(0);

    // Check at least one progress bar for each category
    const langBars = await this.langProgressBars.all();
    const frameworkBars = await this.frameworksProgressBars.all();
    const conceptBars = await this.conceptsProgressBars.all();

    expect(langBars.length).toBeGreaterThan(0);
    expect(frameworkBars.length).toBeGreaterThan(0);
    expect(conceptBars.length).toBeGreaterThan(0);
  }

  async verifyWebQaAutomationProject() {
    await this.webQaAutomationProject.isVisible();
    await expect(this.webQaAutomationProject).toContainText('Web QA Automation');
    await expect(this.webQaAutomationProject).toContainText('Playwright');
    await expect(this.webQaAutomationProject).toContainText('test automation');
  }

  async verifyAllSectionsPresent() {
    await expect(this.summarySection).toBeVisible();
    await expect(this.skillsSection).toBeVisible();
    await expect(this.projectsSection).toBeVisible();
    await expect(this.experienceSection).toBeVisible();
    await expect(this.educationSection).toBeVisible();
  }

  async verifySmoothScrolling() {
    // Test that clicking nav links results in smooth scroll (no jump)
    await this.skillsLink.click();
    await this.page.waitForTimeout(800); // Allow time for smooth scroll
    await expect(this.skillsSection).toBeInViewport();
  }

  async verifyIconHoverEffects() {
    // Test skill icon hover effects
    const skillIcons = this.page.locator('.skill-icon, .icon-skill, [class*="skill"] i, .skills i, .skill-icon i, .tech-icon');
    if (await skillIcons.count() > 0) {
      await skillIcons.first().hover();
      // Wait for potential transition
      await this.page.waitForTimeout(300);
    }
  }

  async verifyFormHandling() {
    await this.contactForm.waitFor({ state: 'visible', timeout: 5000 });
    // Basic form presence test
    await expect(this.contactForm).toBeVisible();
    await expect(this.formSubmitButton).toBeVisible();
  }

  async verifyScrollReveal() {
    // Check that scroll reveal elements exist
    const revealElements = await this.scrollRevealElements.all();
    expect(revealElements.length).toBeGreaterThan(0);
  }

  async verifyResponsiveDesign(viewport: { width: number; height: number }, name: string) {
    await this.page.setViewportSize(viewport);
    await this.page.waitForTimeout(500); // Allow time for responsive adjustments

    await this.verifyHeroSection();
    await this.verifyAllSectionsPresent();
  }
}