<?php
// Every email the site sends. Each function takes the saved enquiry and
// returns ['subject' => …, 'html' => …, 'text' => …]. The plain-text version
// is for email apps that don't show HTML (and helps avoid spam filters).

declare(strict_types=1);

require_once __DIR__ . '/layout.php';

function first_name(string $name): string
{
    return explode(' ', trim($name))[0] ?: 'there';
}

// Friendly labels for the booking details sent by the website.
function booking_rows(array $d): array
{
    $list = fn($v) => is_array($v) ? implode(', ', $v) : (string)($v ?? '');
    $travel = trim(($d['month'] ?? '') . ' ' . ($d['year'] ?? ''));
    $dates = !empty($d['startDate']) ? trim($d['startDate'] . (!empty($d['endDate']) ? ' → ' . $d['endDate'] : '')) : '';
    $guests = isset($d['adults']) ? $d['adults'] . ' adult' . ((int)$d['adults'] === 1 ? '' : 's')
        . (!empty($d['children']) ? ', ' . $d['children'] . ' child' . ((int)$d['children'] === 1 ? '' : 'ren') : '') : '';
    return [
        'Trip'          => $list($d['safariNames'] ?? $d['safari'] ?? ''),
        'When'          => $dates ?: $travel,
        'Guests'        => $guests,
        'Travelling from' => $d['country'] ?? '',
    ];
}

/* 1 ── Booking request received (to the guest) ─────────────────────────── */
function booking_confirmation(array $config, array $q): array
{
    $first = first_name($q['name']);
    $d = $q['details'] ?? [];
    $rows = booking_rows($d) + ['Your notes' => $q['message'] ?? '', 'Reference' => '#GS-' . $q['id']];

    $body = email_paragraph('Hi ' . e($first) . ', thank you for planning your Tanzania safari with us. Your request has reached our team in Arusha.')
        . email_paragraph('This isn\'t a confirmed booking yet. A safari specialist will review your dates and reply <strong>within 24 hours</strong> with a tailored itinerary and price.')
        . email_summary($rows)
        . email_paragraph('Need to change something or ask a question? Just reply to this email or message us on WhatsApp.')
        . email_button('Message us on WhatsApp', 'https://wa.me/255753959375');

    $text = "Hi {$first},\n\nThank you for planning your Tanzania safari with Gillead Safaris. Your request has reached our team in Arusha.\n"
        . "A safari specialist will reply within 24 hours with a tailored itinerary and price.\n\n"
        . implode("\n", array_map(fn($k, $v) => "$k: $v", array_keys(array_filter($rows)), array_filter($rows)))
        . "\n\nQuestions? Reply to this email or WhatsApp +255 753 959 375.\n\nKaribu,\nThe Gillead Safaris team";

    return [
        'subject' => "We've received your safari request (#GS-{$q['id']})",
        'html' => email_layout($config, 'Your safari request has reached our team in Arusha. We\'ll reply within 24 hours.', 'Booking request received', 'Asante, ' . $first . '!', $body),
        'text' => $text,
    ];
}

/* 2 ── Contact enquiry received (to the guest) ─────────────────────────── */
function enquiry_confirmation(array $config, array $q): array
{
    $first = first_name($q['name']);
    $subjectLine = $q['details']['subject'] ?? '';
    $rows = ['Subject' => $subjectLine, 'Your message' => $q['message'] ?? '', 'Reference' => '#GS-' . $q['id']];

    $body = email_paragraph('Hi ' . e($first) . ', thanks for getting in touch. We\'ve received your message and one of our team will reply <strong>within 24 hours</strong>.')
        . email_summary($rows)
        . email_paragraph('In a hurry? We\'re quickest on WhatsApp.')
        . email_button('Chat on WhatsApp', 'https://wa.me/255753959375');

    $text = "Hi {$first},\n\nThanks for getting in touch with Gillead Safaris. We'll reply within 24 hours.\n\n"
        . ($subjectLine ? "Subject: {$subjectLine}\n" : '') . "Your message:\n" . ($q['message'] ?? '') . "\n\nReference: #GS-{$q['id']}\n\nKaribu,\nThe Gillead Safaris team";

    return [
        'subject' => 'We got your message — Gillead Safaris',
        'html' => email_layout($config, 'Thanks for your message. We\'ll reply within 24 hours.', 'Message received', 'Thanks for reaching out, ' . $first, $body),
        'text' => $text,
    ];
}

/* 3 ── Newsletter subscribed (welcome) ────────────────────────────────── */
function subscribe_confirmation(array $config, array $q): array
{
    $first = first_name($q['name']);
    $site = rtrim($config['site_url'], '/');
    $unsub = $site . '/api/unsubscribe.php?token=' . urlencode((string)$q['token']);

    $body = email_paragraph('Hi ' . e($first) . ', welcome aboard! You\'ll now get our safari stories straight from Tanzania.')
        . email_paragraph('Expect where the herds are this season, new trips worth knowing about, and the occasional offer. No spam, ever.')
        . email_button('Explore our safaris', $site . '/safaris');

    $note = 'You subscribed on gilleadsafaris.com. <a href="' . e($unsub) . '" style="color:#C9A97E;">Unsubscribe</a> at any time.';
    $text = "Hi {$first},\n\nWelcome aboard! You'll now get safari stories straight from Tanzania: where the herds are, new trips and the occasional offer.\n\n"
        . "Explore our safaris: {$site}/safaris\n\nUnsubscribe at any time: {$unsub}\n\nKaribu,\nThe Gillead Safaris team";

    return [
        'subject' => "Karibu, {$first}! You're on the list",
        'html' => email_layout($config, 'Welcome! Safari stories, straight from Tanzania.', 'Newsletter', 'Karibu, ' . $first . '!', $body, $note),
        'text' => $text,
        'unsubscribe' => $unsub,
    ];
}

/* 4 ── Newsletter unsubscribed (goodbye) ──────────────────────────────── */
function unsubscribe_confirmation(array $config, array $q): array
{
    $first = first_name($q['name']);
    $site = rtrim($config['site_url'], '/');

    $body = email_paragraph('Hi ' . e($first) . ', you\'ve been unsubscribed and won\'t receive any more newsletters from us.')
        . email_paragraph('If that was a mistake, you can sign up again anytime on our website. And if you\'re ever planning a trip to Tanzania, we\'d still love to help.')
        . email_button('Visit gilleadsafaris.com', $site);

    $text = "Hi {$first},\n\nYou've been unsubscribed and won't receive any more newsletters from Gillead Safaris.\n"
        . "Changed your mind? Sign up again anytime at {$site}\n\nKaribu,\nThe Gillead Safaris team";

    return [
        'subject' => "You've been unsubscribed — Gillead Safaris",
        'html' => email_layout($config, 'You\'ve been unsubscribed from our newsletter.', 'Newsletter', 'Sorry to see you go, ' . $first, $body),
        'text' => $text,
    ];
}

/* 5 ── New enquiry alert (to the team) ────────────────────────────────── */
function team_notification(array $config, array $q): array
{
    $type = ucfirst($q['type']);
    $rows = ['Type' => $type, 'Name' => $q['name'], 'Email' => $q['email'], 'Phone' => $q['phone'] ?? '']
        + ($q['type'] === 'booking' ? booking_rows($q['details'] ?? []) : [])
        + ['Subject' => $q['details']['subject'] ?? '', 'Message' => $q['message'] ?? '', 'Reference' => '#GS-' . $q['id']];

    $body = email_paragraph('A new <strong>' . e(strtolower($type)) . '</strong> just arrived from the website. Reply to this email to answer ' . e(first_name($q['name'])) . ' directly.')
        . email_summary($rows);

    return [
        'subject' => "New {$q['type']} #GS-{$q['id']} from {$q['name']}",
        'html' => email_layout($config, "New {$q['type']} from {$q['name']}", 'Website', 'New ' . strtolower($type), $body),
        'text' => implode("\n", array_map(fn($k, $v) => "$k: $v", array_keys(array_filter($rows)), array_filter($rows))),
    ];
}
