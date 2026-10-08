<?php
// Opens the MySQL connection and hands it back. Every other file that needs
// the database calls db($config).

declare(strict_types=1);

function db(array $config): PDO
{
    static $pdo = null; // reuse one connection per request

    if ($pdo === null) {
        $c = $config['db'];
        $dsn = "mysql:host={$c['host']};dbname={$c['name']};charset=utf8mb4";

        $pdo = new PDO($dsn, $c['user'], $c['password'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // errors throw, never fail silently
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // rows come back as ['column' => value]
            PDO::ATTR_EMULATE_PREPARES   => false,                  // real prepared statements (safer)
        ]);
    }

    return $pdo;
}
