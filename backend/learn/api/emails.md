# `api/emails/` + `mailer.php` + `unsubscribe.php` — the email system

> **Step 3b.** Every form now sends a branded confirmation, built from **one
> shared layout** so all emails look like the same company.

## How it's organised (and why)

```
emails/layout.php     ONE design: header, card, button, summary table, footer
emails/templates.php  FIVE emails — each only writes its own words
mailer.php            sends any template (HTML + plain text)
unsubscribe.php       the link at the bottom of newsletter emails
tools/preview-emails.php   writes all emails to HTML files to look at
```

This is called **separation of concerns**: design in one place, words in
another, sending in a third. Change the footer once in `layout.php` → every
email updates.

| Template function | Sent when | To |
|---|---|---|
| `booking_confirmation` | Booking form submitted | Guest |
| `enquiry_confirmation` | Contact form submitted | Guest |
| `subscribe_confirmation` | Newsletter signup | Subscriber |
| `unsubscribe_confirmation` | They click Unsubscribe | Subscriber |
| `team_notification` | Booking or contact submitted | info@gilleadsafaris.com |

## Why emails are built with old-fashioned `<table>`s

Websites use modern CSS (flexbox, grid, classes). **Email apps don't** — Gmail
strips `<style>` blocks, Outlook renders with Microsoft Word's engine. So emails
use **tables for layout** and **inline `style="…"`** on every element. Ugly to
write, but it looks the same everywhere.

## `e()` — escaping

```php
function e(?string $s): string { return htmlspecialchars(...); }
```
A visitor could type `<script>` or `</table>` as their name. `e()` turns `<`
into `&lt;` so it's *shown* as text instead of breaking the email. **Every
value that came from a visitor goes through `e()`.**

## HTML + plain text (`mailer.php`)

```php
Content-Type: multipart/alternative; boundary="gs_…"
```
One email, two versions separated by a random "boundary" string. The email app
shows HTML if it can, text if it can't. Having a text version also makes spam
filters trust the email more.

```php
$clean = fn($s) => str_replace(["\r", "\n"], '', $s);
```
**Header injection**: if someone typed a line break plus `Bcc: 1000 people` into
their name, a naive mailer would add that header and your server would send
spam. Removing line breaks from header values blocks it.

```php
'=?UTF-8?B?' . base64_encode($subject) . '?='
```
Email headers are ASCII-only. This encoding lets subjects contain "—", "é" or
emoji safely.

```php
List-Unsubscribe: <https://…/unsubscribe.php?token=…>
```
Makes Gmail and Apple Mail show their own **Unsubscribe** button — required by
Gmail for bulk senders since 2024.

## Unsubscribe tokens

When someone subscribes, `submit.php` creates `bin2hex(random_bytes(16))` — a
32-character random secret — and stores it. The unsubscribe link contains it.

*Why not just `?email=sam@example.com`?* Then anyone could unsubscribe anyone.
A random token can't be guessed. `unsubscribe.php` also checks the token is
exactly 32 hex characters before touching the database.

Unsubscribing **doesn't delete** the row — it sets `unsubscribed_at`, so you
keep a record that they opted out (useful for privacy law, and so you never
email them again by mistake).

## Database change

Two columns were added to `schema.sql`:
```sql
token           CHAR(32) NULL,   -- unsubscribe secret
unsubscribed_at DATETIME NULL,   -- when they left
UNIQUE KEY uniq_token (token)     -- no two subscribers share a token
```

## Try it yourself

1. Generate the previews: `php backend/tools/preview-emails.php http://localhost:3000`
   then open the files in `backend/tools/previews/` in your browser.
2. In `templates.php`, change the booking headline from `'Asante, '` to
   `'Thank you, '`, regenerate, and see it change.
3. In `layout.php`, change the button colour (`BRAND['brown']`) — regenerate:
   **every** email's button changes. That's the power of one shared layout.
4. Put `<b>Hacker</b>` as the name in the preview script's sample data —
   it shows as text, not bold. That's `e()` protecting you.
