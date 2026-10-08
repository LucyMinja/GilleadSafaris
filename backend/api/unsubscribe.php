<?php
// The "Unsubscribe" link in newsletter emails opens this page:
//   /api/unsubscribe.php?token=…
// It marks the subscriber as unsubscribed, emails a goodbye, and shows a
// branded confirmation page. The token is a long random secret, so nobody
// can unsubscribe someone else by guessing.

declare(strict_types=1);

require __DIR__ . '/db.php';
require __DIR__ . '/mailer.php';
require __DIR__ . '/emails/templates.php';
$config = require __DIR__ . '/config.php';

header('Content-Type: text/html; charset=utf-8');

$token = $_GET['token'] ?? '';
$found = null;

if (preg_match('/^[a-f0-9]{32}$/', $token)) {
    $pdo = db($config);
    $find = $pdo->prepare("SELECT id, name, email, unsubscribed_at FROM enquiries WHERE token = ? AND type = 'newsletter'");
    $find->execute([$token]);
    $found = $find->fetch() ?: null;

    if ($found && $found['unsubscribed_at'] === null) {
        $pdo->prepare('UPDATE enquiries SET unsubscribed_at = NOW(), status = "closed" WHERE id = ?')->execute([$found['id']]);
        send_mail($config, $found['email'], $found['name'], unsubscribe_confirmation($config, $found));
    }
}

$site = rtrim($config['site_url'], '/');
$body = $found
    ? email_paragraph('You won\'t receive any more newsletters from us. We\'ve sent a short confirmation to your email.')
      . email_paragraph('Changed your mind? You can subscribe again anytime on our website.')
      . email_button('Back to gilleadsafaris.com', $site)
    : email_paragraph('This unsubscribe link is invalid or has expired. If you keep receiving emails, reply to one of them and we\'ll remove you by hand.')
      . email_button('Back to gilleadsafaris.com', $site);

echo email_layout(
    $config,
    $found ? 'You have been unsubscribed.' : 'Unsubscribe link not recognised.',
    'Newsletter',
    $found ? "You've been unsubscribed" : 'Link not recognised',
    $body,
    '',
    'unsubscribe'
);
