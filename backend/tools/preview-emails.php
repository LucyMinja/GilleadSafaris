<?php
// Writes every email template to backend/tools/previews/*.html with sample
// data, so the designs can be opened in a browser without sending anything.
//   php backend/tools/preview-emails.php

declare(strict_types=1);
require __DIR__ . '/../api/emails/templates.php';

$config = ['site_url' => $argv[1] ?? 'https://www.gilleadsafaris.com']; // pass http://localhost:3000 to load the logo locally
$out = __DIR__ . '/previews';
@mkdir($out);

$booking = ['id' => 1042, 'type' => 'booking', 'name' => 'Jane Doe', 'email' => 'jane@example.com', 'phone' => '+44 7700 900000',
    'message' => "It's our honeymoon — a private tent would be lovely.",
    'details' => ['safariNames' => ['3 Days Classic Serengeti Safari'], 'month' => 'July', 'year' => '2027', 'adults' => 2, 'children' => 0, 'country' => 'United Kingdom']];
$contact = ['id' => 1043, 'type' => 'contact', 'name' => 'Ali Hassan', 'email' => 'ali@example.com', 'phone' => '',
    'message' => 'Hi! Can you combine Kilimanjaro with a short Serengeti safari in August?', 'details' => ['subject' => 'Kilimanjaro + safari']];
$news = ['id' => 1044, 'type' => 'newsletter', 'name' => 'Sam Taylor', 'email' => 'sam@example.com', 'token' => str_repeat('a1', 16)];

$all = [
    '1-booking-confirmation' => booking_confirmation($config, $booking),
    '2-enquiry-confirmation' => enquiry_confirmation($config, $contact),
    '3-subscribe-welcome'    => subscribe_confirmation($config, $news),
    '4-unsubscribe-goodbye'  => unsubscribe_confirmation($config, $news),
    '5-team-new-booking'     => team_notification($config, $booking),
];
foreach ($all as $file => $tpl) {
    file_put_contents("$out/$file.html", $tpl['html']);
    echo "$file  —  subject: {$tpl['subject']}\n";
}

// One page that shows every email side by side: open previews/index.html.
// Each email sits in an <iframe> (a page inside a page); the toggle switches
// the frames between desktop (600px) and phone (375px) width.
$cards = '';
foreach ($all as $file => $tpl) {
    $cards .= '<figure><figcaption><b>' . e(ucwords(str_replace('-', ' ', substr($file, 2)))) . '</b><span>Subject: ' . e($tpl['subject']) . '</span></figcaption>'
        . '<iframe src="' . $file . '.html" loading="lazy"></iframe></figure>';
}
file_put_contents("$out/index.html", '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email previews</title><style>'
    . 'body{margin:0;background:#E9E1D5;font-family:system-ui,sans-serif;color:#4E493A}'
    . 'header{position:sticky;top:0;z-index:1;display:flex;gap:16px;align-items:center;justify-content:space-between;padding:14px 24px;background:#4E493A;color:#fff}'
    . 'h1{margin:0;font-size:18px}button{font:inherit;padding:8px 14px;border:0;border-radius:2px;background:#8D694B;color:#fff;cursor:pointer}'
    . 'main{display:flex;flex-wrap:wrap;gap:28px;justify-content:center;padding:28px 16px}'
    . 'figure{margin:0;width:640px;max-width:100%}figcaption{display:flex;flex-direction:column;gap:2px;margin-bottom:8px;font-size:14px}figcaption span{opacity:.75}'
    . 'iframe{width:100%;height:1100px;border:0;background:#fff;box-shadow:0 4px 18px rgba(0,0,0,.12)}'
    . 'body.phone figure{width:375px}body.phone iframe{height:1400px}'
    . '</style></head><body><header><h1>Gillead Safaris — email previews</h1>'
    . '<button onclick="document.body.classList.toggle(\'phone\');this.textContent=document.body.classList.contains(\'phone\')?\'Show desktop\':\'Show phone\'">Show phone</button></header>'
    . '<main>' . $cards . '<figure><figcaption><b>Unsubscribe Page</b><span>What they see after clicking Unsubscribe</span></figcaption><iframe src="6-unsubscribe-page.html" loading="lazy"></iframe></figure></main></body></html>');
echo "index  —  open backend/tools/previews/index.html to see them all\n";
