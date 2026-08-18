# Portfolio Website QA Automation

This repository contains a Playwright-based test automation framework for testing the portfolio website at https://jodell-website.vercel.app/.

## 📋 Overview

The framework tests all functional aspects of the portfolio website including:
- Page loading and title verification
- Navigation between sections (About, Skills, Projects, Experience)
- External links (GitHub, JobStreet, LinkedIn)
- Resume download functionality
- Responsive design across mobile, tablet, and desktop viewports

## 🛠️ Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Playwright browsers (will be installed automatically)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jodss11/web-qa-automation.git
   cd web-qa-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run tests in headed mode (to see the browser):
```bash
npx playwright test --headed
```

### Run tests with specific reporter:
```bash
npx playwright test --reporter=list
npx playwright test --reporter=html
```

### Run a specific test file:
```bash
npx playwright test tests/portfolio.spec.ts
```

### Run tests with grep (by test name):
```bash
npx playwright test -g "should navigate to About section"
```

## 📁 Project Structure

```
web-qa-automation/
├─ tests/
│  └─ portfolio.spec.ts      # Test scenarios
├─ pages/
│  └─ PortfolioPage.ts       # Page Object Model
├─ playwright.config.ts      # Playwright configuration
├─ package.json              # Dependencies and scripts
└─ README.md                 # This file
```

## 🔧 Configuration

Playwright configuration is in `playwright.config.ts`:
- Test directory: `tests`
- Timeout: 30 seconds
- Retries: 1 failure retry
- Report generation: HTML report on CI

## 📊 Test Reports

After running tests, you can view reports:
- **HTML Report**: `npx playwright show-report`
- **JUnit/XML**: Configured in playwright.config for CI integration

## 🎯 Test Coverage

The test suite covers:

1. **Basic Page Validation**
   - Page title verification
   - Hero section visibility

2. **Navigation Testing**
   - About section navigation (`#summary`)
   - Skills section navigation (`#skills`)
   - Projects section navigation (`#projects`)
   - Experience section navigation (`#experience`)
   - All sections visibility verification

3. **External Links**
   - GitHub profile link (avoids project links)
   - JobStreet profile link
   - LinkedIn profile link

4. **File Download**
   - Resume PDF download verification

5. **Responsive Design**
   - Mobile viewport (375x667)
   - Tablet viewport (768x1024)
   - Desktop viewport (1920x1080)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Playwright team for the excellent testing framework
- Vercel for hosting the portfolio site