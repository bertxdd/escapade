# Security Policy

## Supported Versions

Escapade is a continuously deployed web application. Only the latest live version at the production URL is actively maintained and receives security updates.

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | ✅ |
| Older commits / forks | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, **please do not open a public GitHub issue.** Instead, report it responsibly by emailing:

📧 **jugadomichael@gmail.com**

### What to include in your report

Please provide as much detail as possible:

- A clear description of the vulnerability
- Steps to reproduce the issue
- The potential impact or attack scenario
- Any suggested fixes (optional but appreciated)

### What to expect

| Timeline | Action |
| -------- | ------ |
| Within **48 hours** | Acknowledgement of your report |
| Within **7 days** | Initial assessment and severity triage |
| Within **30 days** | Resolution or status update |

### After your report

- If the vulnerability is **accepted**, we will work on a fix, keep you informed of progress, and credit you (if you'd like) once it's resolved.
- If the vulnerability is **declined** (e.g., out of scope or not reproducible), we will explain the reasoning in our response.

## Scope

The following are considered **in scope** for this security policy:

- The Escapade landing page frontend (React/TypeScript/Vite)
- Supabase integration and data handling
- Authentication and session management

The following are **out of scope**:

- Third-party services (Supabase, Vercel infrastructure)
- Vulnerabilities in upstream dependencies (report those to the respective projects)
- Social engineering attacks

## Responsible Disclosure

We kindly ask that you:

- Give us reasonable time to address the issue before any public disclosure
- Avoid accessing, modifying, or deleting user data during your research
- Act in good faith and in line with our [Code of Conduct](CODE_OF_CONDUCT.md)

Thank you for helping keep Escapade and its users safe. 🙏
