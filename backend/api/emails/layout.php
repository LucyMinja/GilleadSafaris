<?php
// The one shared look for every email Gillead Safaris sends: logo header,
// beige card, serif headline, brown button, dark-olive footer. Each template
// in templates.php only supplies the words in the middle.
//
// Emails are built with <table>s and inline styles on purpose — Gmail,
// Outlook and Apple Mail ignore most modern CSS (flexbox, <style> classes).

declare(strict_types=1);

// Escape text before putting it into HTML (stops broken layouts and injection).
function e(?string $s): string
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

const BRAND = [
    'beige'  => '#F1EAE0',
    'card'   => '#FBF8F3',
    'olive'  => '#6D6753',
    'chrome' => '#4E493A',
    'brown'  => '#8D694B',
    'tan'    => '#C9A97E',
    'serif'  => "'Newsreader', Georgia, 'Times New Roman', serif",
    'sans'   => "'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif",
];

// A brown, square-cornered button (matches SafariButton on the website).
function email_button(string $label, string $href): string
{
    $b = BRAND;
    return '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;"><tr>'
        . '<td style="background:' . $b['brown'] . ';border-radius:2px;">'
        . '<a href="' . e($href) . '" style="display:inline-block;padding:14px 28px;font-family:' . $b['sans'] . ';font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;text-decoration:none;">'
        . e($label) . '</a></td></tr></table>';
}

// A two-column "label | value" summary table (booking details etc.).
function email_summary(array $rows): string
{
    $b = BRAND;
    $html = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border-top:1px solid #E5DACB;">';
    foreach ($rows as $label => $value) {
        if ($value === null || $value === '') continue;
        $html .= '<tr>'
            . '<td style="padding:12px 0;border-bottom:1px solid #E5DACB;font-family:' . $b['sans'] . ';font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:' . $b['brown'] . ';width:40%;vertical-align:top;">' . e($label) . '</td>'
            . '<td style="padding:12px 0;border-bottom:1px solid #E5DACB;font-family:' . $b['sans'] . ';font-size:15px;color:' . $b['olive'] . ';vertical-align:top;">' . nl2br(e((string)$value)) . '</td>'
            . '</tr>';
    }
    return $html . '</table>';
}

function email_paragraph(string $text): string
{
    $b = BRAND;
    return '<p style="margin:0 0 16px;font-family:' . $b['sans'] . ';font-size:16px;line-height:1.7;color:' . $b['olive'] . ';">' . $text . '</p>';
}

/**
 * Wrap content in the branded layout.
 * $preheader — the grey preview line inboxes show after the subject.
 * $footerNote — optional extra line (e.g. the unsubscribe link).
 */
function email_layout(array $config, string $preheader, string $eyebrow, string $headline, string $bodyHtml, string $footerNote = ''): string
{
    $b = BRAND;
    $site = rtrim($config['site_url'], '/');
    $year = date('Y');

    return '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light">'
        . '<title>' . e($headline) . '</title></head>'
        . '<body style="margin:0;padding:0;background:' . $b['beige'] . ';">'
        // hidden preheader
        . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' . e($preheader) . '</div>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' . $b['beige'] . ';"><tr><td align="center" style="padding:32px 16px;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">'

        // header
        . '<tr><td style="background:' . $b['chrome'] . ';padding:22px 32px;" align="left">'
        . '<a href="' . e($site) . '" style="text-decoration:none;"><img src="' . e($site) . '/images/og2.png" width="56" height="56" alt="Gillead Safaris" style="display:inline-block;vertical-align:middle;border:0;"></a>'
        . '<span style="display:inline-block;vertical-align:middle;margin-left:12px;font-family:' . $b['serif'] . ';font-size:20px;font-weight:600;color:#ffffff;">Gillead Safaris</span>'
        . '</td></tr>'

        // card
        . '<tr><td style="background:' . $b['card'] . ';padding:40px 32px 32px;">'
        . '<p style="margin:0 0 10px;font-family:' . $b['sans'] . ';font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:' . $b['brown'] . ';">' . e($eyebrow) . '</p>'
        . '<h1 style="margin:0 0 20px;font-family:' . $b['serif'] . ';font-size:30px;line-height:1.2;font-weight:600;color:' . $b['olive'] . ';">' . e($headline) . '</h1>'
        . $bodyHtml
        . '<p style="margin:28px 0 0;font-family:' . $b['sans'] . ';font-size:15px;line-height:1.7;color:' . $b['olive'] . ';">Karibu,<br><strong>The Gillead Safaris team</strong><br>Arusha, Tanzania</p>'
        . '</td></tr>'

        // footer
        . '<tr><td style="background:' . $b['chrome'] . ';padding:26px 32px;" align="center">'
        . '<p style="margin:0 0 8px;font-family:' . $b['sans'] . ';font-size:13px;color:#ffffff;">'
        . '<a href="tel:+255753959375" style="color:#ffffff;text-decoration:none;">+255 753 959 375</a>'
        . ' &nbsp;·&nbsp; <a href="https://wa.me/255753959375" style="color:#ffffff;text-decoration:none;">WhatsApp</a>'
        . ' &nbsp;·&nbsp; <a href="mailto:info@gilleadsafaris.com" style="color:#ffffff;text-decoration:none;">info@gilleadsafaris.com</a></p>'
        . '<p style="margin:0;font-family:' . $b['sans'] . ';font-size:12px;color:' . $b['tan'] . ';">© ' . $year . ' Gillead Safaris Tanzania Ltd · Arusha, Tanzania</p>'
        . ($footerNote !== '' ? '<p style="margin:12px 0 0;font-family:' . $b['sans'] . ';font-size:12px;color:#cfc6b6;">' . $footerNote . '</p>' : '')
        . '</td></tr>'

        . '</table></td></tr></table></body></html>';
}
