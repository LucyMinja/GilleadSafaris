# `api/config.example.php` — settings & secrets

> **Step 2a.** Before PHP can talk to MySQL it needs a username and password.
> Those must **never** be written into code that goes to GitHub.

## What this file does

It's a **template** listing every setting the backend needs. On the server you
copy it to **`config.php`** and fill in the real values. `config.php` is listed
in `.gitignore`, so Git will never upload it.

```
config.example.php   ← in Git, fake values, shows WHAT is needed
config.php           ← NOT in Git, real passwords, lives only on the server
```

## Block by block

```php
<?php
return [ ... ];
```
A PHP file can **`return`** a value. Another file loads it with
`$config = require 'config.php';` and gets this array. Simple and fast — no
special config library needed.

```php
'db' => ['host' => 'localhost', 'name' => …, 'user' => …, 'password' => …],
```
How to reach MySQL. On cPanel the host is `localhost` (database and PHP are on
the same server). cPanel prefixes names with your account username, e.g.
`kostiv_gillead`.

```php
'notify_to' => 'info@gilleadsafaris.com',
'mail_from' => 'info@gilleadsafaris.com',
```
Who gets the "new enquiry" email, and the sender address. Use an address on
**your own domain** — mail "from" Gmail sent by your server is often marked spam.

```php
'allowed_origins' => [...],
```
The websites allowed to send forms here. See **CORS** in `submit.php.md`.

```php
'max_per_hour' => 5,
```
Spam protection — at most 5 saved enquiries per hour from one visitor.

```php
'debug' => false,
```
On your Mac we set `true` so testing doesn't send real emails.

## Key concepts

| Concept | Meaning |
|---|---|
| Secret | Anything that grants access (passwords, API keys) |
| `.gitignore` | Files Git must never track |
| Config vs code | Code is the same everywhere; config differs per server |
| `return` from a file | PHP's simplest way to load settings |

## Try it yourself

1. Open `/.gitignore` at the project root and find the line `backend/api/config.php`.
2. Run `git status` — notice `config.php` (your local copy) is **not** listed,
   even though it exists. That's Git ignoring it.
3. Add a new setting `'site_name' => 'Gillead Safaris'` to your local
   `config.php`, then in Terminal run:
   `php -r '$c = require "backend/api/config.php"; echo $c["site_name"];'`
