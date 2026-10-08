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
