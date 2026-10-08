# `api/submit.php` — receiving the website's forms

> **Step 3 — the heart of the backend.** Every form on the website sends its data
> here. This file checks it, protects against abuse, saves it and emails the team.

## The journey of one enquiry

```
Visitor clicks "Submit"
   │  browser sends:  POST /api/submit.php   (body = JSON)
   ▼
1 CORS        is it from our own website?
2 Read JSON   turn the text into a PHP array
3 Honeypot    is it a bot?
4 Validate    are name / email / message OK?
5 Rate limit  too many from this visitor?
6 Save        INSERT into `enquiries`
7 Email       tell info@gilleadsafaris.com
   │  responds:  {"ok": true, "id": 42}
   ▼
Website shows "Thank you"
```

## Block by block

### Setup
```php
require __DIR__ . '/db.php';
$config = require __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');
```
Load our helper and settings. `__DIR__` = "the folder this file is in", so the
paths work wherever the folder is uploaded. The header tells the browser we
answer in **JSON**.

```php
function respond(int $status, array $body): never { ... exit; }
```
One helper to send an answer and stop. **HTTP status codes** tell the website
what happened:

| Code | Meaning here |
|---|---|
| 201 | Created — saved successfully |
| 400 | Bad request — not valid JSON |
| 405 | Wrong method — must be POST |
| 422 | Validation failed — e.g. missing name |
| 429 | Too many requests — rate limit |

### 1. CORS
```php
if (in_array($origin, $config['allowed_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin"); ...
}
```
Browsers block a web page from posting to a *different* domain unless that
domain says "I allow you". **CORS** (Cross-Origin Resource Sharing) is that
permission. We only grant it to our own site — a stranger's website can't
make visitors' browsers submit to us.

The `OPTIONS` request is the browser asking first ("may I POST JSON?"); we
answer 204 = "yes, go ahead".

### 2. Read the JSON
```php
$data = json_decode(file_get_contents('php://input') ?: '', true);
```
`php://input` is the raw request body. `json_decode(..., true)` turns
`{"name":"Jane"}` into `['name' => 'Jane']`.

### 3. Honeypot
```php
if (!empty($data['website'])) respond(200, ['ok' => true]);
```
The form will include a field called `website` that's **invisible** to people.
Bots fill every field they find; humans never see it. If it's filled → it's a
bot. We *pretend* success so the bot doesn't try harder — and save nothing.

### 4. Validate
```php
$clean = fn($v, int $max) => mb_substr(trim((string)($v ?? '')), 0, $max);
```
A tiny function: turn the value into text, trim spaces, cut to a max length
(`mb_` = multi-byte safe, so it never cuts a letter like "é" in half).

```php
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = '...';
```
PHP's built-in email checker. **Never trust input from the browser** — anyone
can send anything to this URL, not just our form.

### 5. Rate limit
```php
SELECT COUNT(*) FROM enquiries WHERE ip_address = ? AND created_at > NOW() - INTERVAL 1 HOUR
```
How many enquiries has this IP saved in the last hour? Five or more → 429.
This uses the `idx_ip_created` index from step 1 — so it stays fast.

### 6. Save — prepared statements
```php
$insert = $pdo->prepare('INSERT INTO enquiries (...) VALUES (:type, :name, ...)');
$insert->execute([':type' => $type, ':name' => $name, ...]);
```
**This is the most important security line in the file.** The SQL is sent to
MySQL *first*, with placeholders (`:name`). The visitor's text is sent
*separately* as data. MySQL never treats it as code.

**SQL injection** is when an attacker types code into a form, e.g. a name of
`Robert'); DROP TABLE enquiries;--`. If you glued that into the SQL string, it
could delete your table. With prepared statements it's just saved as a strange
name. *We tested exactly this — it was stored harmlessly as text.*

### 7. Email
```php
@mail($config['notify_to'], $subject, $body, $headers);
```
PHP's built-in `mail()` uses cPanel's mail server. `Reply-To` is set to the
visitor, so the team can just press *Reply*. The `@` hides a mail warning — if
email fails, the enquiry is **already saved**, so the visitor still gets
success and nothing is lost.

## What we tested (all passed)

| Test | Result |
|---|---|
| Valid booking / contact / newsletter | 201, saved |
| Missing name + bad email | 422 with both errors |
| Contact with no message | 422 |
| Bot filled the honeypot | 200, **not** saved |
| SQL injection in the name | Saved as plain text, table safe |
| 6th enquiry within an hour | 429 blocked |
| GET instead of POST | 405 |
| Request from a foreign website | No CORS permission → browser blocks it |

## Try it yourself

1. Start a local PHP server: `php -S 127.0.0.1:8088 -t backend/api`
2. In a second Terminal, send an enquiry:
   ```bash
   curl -X POST http://127.0.0.1:8088/submit.php \
     -H "Content-Type: application/json" -H "Origin: http://localhost:3000" \
     -d '{"type":"contact","name":"Me","email":"me@example.com","message":"Hi!"}'
   ```
3. Check it arrived: `mysql -u root gillead_local -e "SELECT * FROM enquiries ORDER BY id DESC LIMIT 1;"`
4. **Experiment:** send an email without "@", leave out `message`, add
   `"website":"x"`. Predict the answer *before* you press Enter.
