<?php
// Sends one email with both an HTML and a plain-text version
// ("multipart/alternative") — the email app shows whichever it supports.

declare(strict_types=1);

/**
 * $tpl comes from templates.php: ['subject', 'html', 'text', optional 'unsubscribe'].
 * Returns true if PHP handed the email to the server's mail system.
 */
function send_mail(array $config, string $to, string $toName, array $tpl, ?string $replyTo = null): bool
{
    if (!empty($config['debug'])) {
        return true; // local testing: never send real email
    }

    $boundary = 'gs_' . bin2hex(random_bytes(12));
    $from = $config['mail_from'];

    // Strip line breaks from anything going into headers (blocks header injection).
    $clean = fn(string $s) => str_replace(["\r", "\n"], '', $s);

    $headers = [
        'From: Gillead Safaris <' . $clean($from) . '>',
        'Reply-To: ' . $clean($replyTo ?? $from),
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    ];
    if (!empty($tpl['unsubscribe'])) {
        // Lets Gmail/Apple Mail show their own "Unsubscribe" button.
        $headers[] = 'List-Unsubscribe: <' . $clean($tpl['unsubscribe']) . '>';
    }

    $body = "--{$boundary}\r\n"
        . "Content-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n"
        . $tpl['text'] . "\r\n\r\n"
        . "--{$boundary}\r\n"
        . "Content-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n"
        . $tpl['html'] . "\r\n\r\n"
        . "--{$boundary}--";

    $subject = '=?UTF-8?B?' . base64_encode($tpl['subject']) . '?=';
    $toHeader = $toName !== '' ? '=?UTF-8?B?' . base64_encode($clean($toName)) . '?= <' . $clean($to) . '>' : $clean($to);

    return @mail($toHeader, $subject, $body, implode("\r\n", $headers), '-f' . $from);
}
