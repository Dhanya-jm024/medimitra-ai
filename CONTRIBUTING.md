# Contributing to MediMitra AI 🏥

Thank you for your interest in contributing to **MediMitra AI**! We welcome open-source contributions to expand inclusive healthcare accessibility across rural and underserved regions worldwide.

---

## 🛠️ Getting Started

1. **Fork the Repository**: Click the **Fork** button at the top right of [https://github.com/Dhanya-jm024/medimitra-ai](https://github.com/Dhanya-jm024/medimitra-ai).
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/medimitra-ai.git
   cd medimitra-ai
   ```
3. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```
4. **Environment Configuration**:
   Copy `.env.example` to `frontend/.env.local` and add your Google Gemini API Key.
5. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 📋 Guidelines

- **Code Style**: We use TypeScript, Tailwind CSS, and Next.js 14 App Router conventions.
- **Accessibility (a11y)**: Ensure all UI components maintain WCAG AAA contrast ratios, keyboard navigation support, and proper ARIA labels.
- **Localization (i18n)**: When adding UI strings, add dictionary entries in `frontend/locales/` (`en.json`, `hi.json`, `kn.json`, `ta.json`, `te.json`).

---

## 📜 Code of Conduct

MediMitra AI is dedicated to providing a welcoming, inclusive environment for everyone regardless of background, gender, or orientation. Please be respectful and collaborative in all pull requests and issues.
