# Gillead Safaris — Backend (PHP + MySQL)

Everything server-side lives here, separate from the Next.js website.
It runs on the cPanel hosting; the website's forms send their data to it.

```
backend/
├── database/        SQL for the MySQL tables (run once in phpMyAdmin)
│   └── schema.sql   → the `enquiries` table              ✅ step 1
├── api/             PHP that receives the website's forms
│   ├── config.php   → passwords & settings (NOT in Git)  ⏳ step 2
│   ├── db.php       → opens the database connection      ⏳ step 2
│   └── submit.php   → validate, save, email              ⏳ step 3
├── admin/           Password-protected dashboard          ⏳ step 5
└── learn/           A learning note for every file above
    └── database/schema.sql.md                             ✅ step 1
```

**On cPanel** this folder is uploaded as `public_html/api/` and
`public_html/admin/` (the website itself goes in `public_html/`).

**Learning:** each code file has a matching note in `learn/` with the same
path — read the note before moving to the next step.
