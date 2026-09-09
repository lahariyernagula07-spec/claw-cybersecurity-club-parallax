# Cyber Club Website

Cyber Club website with cinematic/parallax frontend and a contact form backend.

## Contact details

- College: Raghu Engineering College
- Club email: cyberclub@raghuenggcollege.in

## Run locally

1. Open a terminal in this project folder.
2. Run:

```bash
npm install
```

3. Copy `.env.example` to `.env`.
4. Add the SMTP account details to `.env`.
5. Run:

```bash
npm start
```

6. Open `http://localhost:5000`.

The Contact form sends the visitor's name, email and message to `cyberclub@raghuenggcollege.in` through the configured SMTP account. The visitor's email is set as `Reply-To`, so the club can reply directly.

### Important

The website cannot send email directly from browser-only `index.html`. The included Node.js backend handles the email securely. Keep `.env` private and never commit it to GitHub.
