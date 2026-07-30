# Security Policy

## Supported Versions

Only the latest release of MediMitra AI receives security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security and privacy of healthcare data very seriously.

If you discover a security vulnerability in MediMitra AI, please report it to our security team via email at `security@medimitra-ai.org` or open a confidential issue.

### Response Expectations
- **Initial Acknowledgment**: Within 24 hours.
- **Triage & Severity Assessment**: Within 48 hours.
- **Fix Release**: Within 7 business days for high-severity vulnerabilities.

## Security Best Practices
- Never commit real API keys or `.env.local` files to public repositories.
- All database queries enforce Supabase Row Level Security (RLS) policies based on `auth.uid()`.
