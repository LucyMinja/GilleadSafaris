# `api/db.php` — connecting to MySQL

> **Step 2b.** One small function that every other file uses to reach the database.

## What this file does

Defines `db($config)`, which opens a connection to MySQL using **PDO** and
returns it. Other files then run queries on that connection.

## Block by block

```php
declare(strict_types=1);
```
Tells PHP to be strict about types: pass a number where text is expected and
it errors instead of silently converting. Catches bugs early.

```php
function db(array $config): PDO
```
A function named `db` that takes the config array and **returns a `PDO`
object** (the connection). The `: PDO` is a *return type* — PHP checks it.

```php
static $pdo = null;
if ($pdo === null) { ... }
return $pdo;
```
**`static`** keeps the variable's value between calls. The first call creates
the connection; later calls in the same request reuse it instead of opening a
new one each time. Faster, and kinder to the server.

```php
$dsn = "mysql:host={$c['host']};dbname={$c['name']};charset=utf8mb4";
```
A **DSN** (Data Source Name) tells PDO *which* database to open. `charset=utf8mb4`
matches our table so names like José or emoji survive the trip.

```php
new PDO($dsn, $user, $password, [ ...options... ]);
```
Opens the connection. The three options matter:

| Option | Why |
|---|---|
| `ERRMODE_EXCEPTION` | If a query fails, PHP throws an error you'll see — instead of quietly continuing with wrong data |
| `FETCH_ASSOC` | Rows come back as `['name' => 'Jane']`, easy to read |
| `EMULATE_PREPARES => false` | Use MySQL's **real** prepared statements — the main defence against SQL injection (see `submit.php.md`) |

## Why PDO and not `mysqli`?

Both work. **PDO** works with many databases (MySQL, PostgreSQL, SQLite…), so
what you learn here transfers. It's also what most modern PHP code uses.

## Try it yourself

In Terminal, from the project folder:
```bash
php -r 'require "backend/api/db.php"; $c = require "backend/api/config.php";
        $n = db($c)->query("SELECT COUNT(*) FROM enquiries")->fetchColumn();
        echo "Enquiries saved: $n\n";'
```
Then change the password in your local `config.php` to something wrong and run
it again — read the error. That's `ERRMODE_EXCEPTION` doing its job. (Change it back!)
