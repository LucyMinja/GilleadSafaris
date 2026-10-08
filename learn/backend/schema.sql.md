# `backend/schema.sql` — the database table

> **Step 1 of the backend.** Before any PHP, we decide *what we store*. Everything
> else (the form handler, the admin dashboard) is built around this table.

## What this file does

It creates one table called **`enquiries`**. Every time someone submits a form on
the website — Booking, Contact or Newsletter — one **row** is added to it.

Think of a table like a spreadsheet:

| id | type    | status | name     | email          | phone | message | details | ip_address | created_at |
|----|---------|--------|----------|----------------|-------|---------|---------|------------|------------|
| 1  | booking | new    | Jane Doe | jane@mail.com  | +44…  | …       | {…}     | 41.x.x.x   | 2026-10-09 |

- **Columns** = the kinds of information (name, email…).
- **Rows** = one enquiry each.

## Why one table for all three forms?

The three forms share most fields: a name, an email, a time. Putting them in
**one** table means the admin dashboard can show *all* enquiries in one list,
filtered by `type`. The few fields that differ (safari choice, dates, number of
guests) go into the flexible `details` column — see below.

## Block by block

```sql
CREATE TABLE IF NOT EXISTS enquiries (
```
Create a table named `enquiries`. **`IF NOT EXISTS`** makes the file safe to run
twice — the second time it simply does nothing instead of erroring.

```sql
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
```
A unique number for every row. **`AUTO_INCREMENT`** means MySQL fills it in for
us: 1, 2, 3… **`UNSIGNED`** = no negative numbers (doubles the range).
**`NOT NULL`** = this column can never be empty.

```sql
  type ENUM('booking', 'contact', 'newsletter') NOT NULL,
```
**`ENUM`** = the value *must* be one from this list. If buggy code tried to save
`type = 'bokking'`, MySQL would reject it. The database protects itself.

```sql
  status ENUM('new', 'replied', 'quoted', 'booked', 'closed') NOT NULL DEFAULT 'new',
```
Where the enquiry is in the sales process. **`DEFAULT 'new'`** — a fresh
enquiry starts as *new*; the client changes it later in the admin dashboard
(New → Replied → Quoted → Booked).

```sql
  name  VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(40)  NULL,
```
**`VARCHAR(n)`** = text up to *n* characters. Name and email are required
(`NOT NULL`); phone is optional (`NULL` allowed — the newsletter doesn't ask
for it). *Why 190 for email?* It keeps the column small enough to be indexed
safely in the `utf8mb4` character set.

```sql
  message TEXT NULL,
```
**`TEXT`** = long text (up to ~65,000 characters) — for "Special requests" or a
contact message.

```sql
  details JSON NULL,
```
**`JSON`** stores structured data, e.g.
`{"safari": ["classic-serengeti-3-days"], "adults": 2, "children": 1, "month": "July"}`.
This is how one table handles three different forms without dozens of
mostly-empty columns. MySQL checks it's valid JSON before saving.

```sql
  ip_address VARCHAR(45) NULL,
```
The visitor's IP address — used **only** for spam protection ("no more than 5
enquiries per hour from one address"). 45 characters fits even the long IPv6
format.

```sql
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
```
When the enquiry arrived. MySQL fills it in automatically.

```sql
  PRIMARY KEY (id),
```
The **primary key** uniquely identifies each row. No two rows can share an `id`.

```sql
  INDEX idx_created (created_at),
  INDEX idx_type_status (type, status),
  INDEX idx_ip_created (ip_address, created_at)
```
**Indexes** are like the index at the back of a book: they let MySQL find rows
fast without reading the whole table. We index exactly what we'll search by:
- newest first (`created_at`) — the dashboard list,
- filter by type + status — "show me new bookings",
- IP + time — the spam check.

```sql
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```
- **`InnoDB`** — MySQL's modern, crash-safe storage engine.
- **`utf8mb4`** — stores *any* character: accents (José), Swahili, and emoji.
  (Plain `utf8` in MySQL can't store emoji — a classic beginner trap.)
- **`utf8mb4_unicode_ci`** — sorting/comparing rules; `ci` = case-insensitive,
  so `JANE@mail.com` and `jane@mail.com` match in searches.

## Key concepts you learned

| Concept | One-line meaning |
|---|---|
| Table / row / column | Spreadsheet / one entry / one kind of data |
| Data types | `INT`, `VARCHAR`, `TEXT`, `JSON`, `DATETIME`, `ENUM` |
| `NOT NULL` / `NULL` | Required / optional |
| `DEFAULT` | Value used when none is given |
| Primary key | Unique ID for each row |
| Index | Makes searches fast |
| `utf8mb4` | Full Unicode, including emoji |

## Try it yourself

1. In Terminal, open MySQL: `mysql -u root`
2. Create a practice database and the table:
   ```sql
   CREATE DATABASE gillead_practice;
   USE gillead_practice;
   SOURCE /Users/kostivinvestiment/Downloads/Safaris/backend/schema.sql;
   ```
3. Insert a fake enquiry yourself:
   ```sql
   INSERT INTO enquiries (type, name, email, details)
   VALUES ('booking', 'Test Person', 'test@example.com', '{"adults": 2}');
   ```
4. Look at it: `SELECT * FROM enquiries;` — notice `id`, `status` and
   `created_at` were filled in automatically.
5. **Break it on purpose:** try `type = 'bokking'` or leave out `email`. Read
   the error — that's the table protecting your data.
6. Clean up when done: `DROP DATABASE gillead_practice;`
