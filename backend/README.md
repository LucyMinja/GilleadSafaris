# Gillead Safaris — Backend (PHP + MySQL)

Everything server-side lives here, separate from the Next.js website.
It runs on the cPanel hosting; the website's forms send their data to it.

```
backend/
├── database/        SQL for the MySQL tables (run once in phpMyAdmin)
│   └── schema.sql   → the `enquiries` table              ✅ step 1
├── api/             PHP that receives the website's forms
│   ├── config.example.php → settings template            ✅ step 2
│   ├── config.php   → real passwords (NOT in Git)         ✅ step 2
│   ├── db.php       → opens the database connection      ✅ step 2
│   ├── submit.php   → validate, save, email              ✅ step 3
│   ├── .htaccess    → blocks config/db from the browser  ✅ step 3
│   ├── mailer.php   → sends HTML + text emails           ✅ step 3b
│   ├── unsubscribe.php → newsletter unsubscribe link     ✅ step 3b
│   └── emails/      → layout.php + templates.php (5 emails) ✅ step 3b
├── tools/
│   └── preview-emails.php → writes all emails to tools/previews/*.html
├── admin/           Password-protected dashboard          ⏳ step 5
└── learn/           A learning note for every file above
    ├── database/schema.sql.md                             ✅
    └── api/  config · db · submit · .htaccess · emails    ✅
```

**On cPanel** this folder is uploaded as `public_html/api/` and
`public_html/admin/` (the website itself goes in `public_html/`).

**Learning:** each code file has a matching note in `learn/` with the same
path — read the note before moving to the next step.

## Run it locally (Mac)

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS gillead_local"
mysql -u root gillead_local < backend/database/schema.sql
cp backend/api/config.example.php backend/api/config.php   # then edit: root / no password / gillead_local / debug true
php -S 127.0.0.1:8088 -t backend/api
```
