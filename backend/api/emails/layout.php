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
    return '<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:28px auto 8px;"><tr>'
        . '<td style="background:' . $b['brown'] . ';border-radius:2px;">'
        . '<a href="' . e($href) . '" style="display:inline-block;padding:14px 28px;font-family:' . $b['sans'] . ';font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;text-decoration:none;">'
        . e($label) . '</a></td></tr></table>';
}

// A two-column "label | value" summary on a soft beige panel — no divider lines.
function email_summary(array $rows): string
{
    $b = BRAND;
    $html = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;background:#F1EAE0;border-radius:2px;">';
    foreach ($rows as $label => $value) {
        if ($value === null || $value === '') continue;
        $html .= '<tr class="gs-row">'
            . '<td style="padding:10px 0 10px 20px;font-family:' . $b['sans'] . ';font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:' . $b['brown'] . ';width:40%;vertical-align:top;">' . e($label) . '</td>'
            . '<td style="padding:10px 20px 10px 0;font-family:' . $b['sans'] . ';font-size:15px;color:' . $b['olive'] . ';vertical-align:top;">' . nl2br(e((string)$value)) . '</td>'
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
 * $preheader  — the grey preview line inboxes show after the subject.
 * $hero       — which signature photo the email uses: a full-colour strip under the logo
 *               (public/email/banner-<hero>.jpg) and a faded copy behind everything (wm-<hero>.jpg):
 *               booking, enquiry, subscribe, unsubscribe or team.
 * $footerNote — optional extra line (e.g. the unsubscribe link).
 */
function email_layout(array $config, string $preheader, string $eyebrow, string $headline, string $bodyHtml, string $footerNote = '', string $hero = 'booking'): string
{
    $b = BRAND;
    $site = rtrim($config['site_url'], '/');
    $year = date('Y');
    $hero = in_array($hero, ['booking', 'enquiry', 'subscribe', 'unsubscribe', 'team'], true) ? $hero : 'team';
    $wm = e($site . '/email/wm-' . $hero . '.jpg');

    return '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light">'
        // Phones: less padding, smaller headline, details stacked. Inline styles
        // stay as the fallback for apps that ignore <style>.
        . '<style>@media only screen and (max-width:620px){'
        . '.gs-outer{padding:0!important}.gs-pad{padding-left:14px!important;padding-right:14px!important}'
        . '.gs-h1{font-size:26px!important}.gs-panel{padding:26px 18px 22px!important}.gs-tag{font-size:14px!important}.gs-logo{width:52px!important;height:52px!important}'
        . '.gs-row td{display:block!important;width:auto!important;padding:2px 16px!important}.gs-row td:first-child{padding-top:12px!important}.gs-row td:last-child{padding-bottom:12px!important}'
        . '}</style>'
        . '<title>' . e($headline) . '</title></head>'
        . '<body style="margin:0;padding:0;background:' . $b['beige'] . ';">'
        . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' . e($preheader) . '</div>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' . $b['beige'] . ';"><tr><td align="center" class="gs-outer" style="padding:32px 16px;">'
        // This email's signature photo runs faded behind the whole email, header to footer.
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" background="' . $wm . '" bgcolor="' . $b['card'] . '" style="max-width:600px;background:' . $b['card'] . ' url(' . $wm . ') center top/cover no-repeat;">'

        // header — logo left, tagline right (transparent so the watermark shows)
        . '<tr><td class="gs-pad" style="padding:22px 32px 18px;background:rgba(251,248,243,0.82);">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>'
        . '<td align="left" style="vertical-align:middle;"><a href="' . e($site) . '"><img src="' . e($site) . '/images/og2.png" width="64" height="64" alt="Gillead Safaris" class="gs-logo" style="display:block;border:0;"></a></td>'
        . '<td align="right" class="gs-tag" style="vertical-align:middle;font-family:' . $b['serif'] . ';font-size:17px;font-weight:600;line-height:1.35;color:' . $b['olive'] . ';">Where the wild<br><span style="color:' . $b['brown'] . ';">still sets the pace</span></td>'
        . '</tr></table></td></tr>'

        // signature photo, full colour — a real <img>, so it shows even where backgrounds don't (Outlook)
        . '<tr><td style="padding:0;"><img src="' . e($site . '/email/banner-' . $hero . '.jpg') . '" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;"></td></tr>'

        // body
        . '<tr><td class="gs-pad" style="padding:28px 32px 36px;">'
        // Frosted cream panel: the photo shows strongly around it, the words stay crisp on it.
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td class="gs-panel" bgcolor="' . $b['card'] . '" style="padding:34px 30px 30px;background:rgba(251,248,243,0.9);border-radius:2px;">'
        . '<p style="margin:0 0 10px;text-align:center;font-family:' . $b['sans'] . ';font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:' . $b['brown'] . ';">' . e($eyebrow) . '</p>'
        . '<h1 class="gs-h1" style="margin:0 0 26px;text-align:center;font-family:' . $b['serif'] . ';font-size:32px;line-height:1.2;font-weight:600;color:' . $b['olive'] . ';">' . e($headline) . '</h1>'
        . $bodyHtml
        . '<p style="margin:30px 0 0;text-align:center;font-family:' . $b['sans'] . ';font-size:15px;line-height:1.7;color:' . $b['olive'] . ';">Karibu,<br><strong>The Gillead Safaris team</strong><br>Arusha, Tanzania</p>'
        . '</td></tr></table>'
        . '</td></tr>'

        // footer
        . '<tr><td class="gs-pad" style="background:rgba(78,73,58,0.9);padding:26px 32px;" align="center">'
        . '<p style="margin:0 0 8px;font-family:' . $b['sans'] . ';font-size:13px;color:#ffffff;">'
        . '<a href="tel:+255753959375" style="color:#ffffff;text-decoration:none;">+255 753 959 375</a>'
        . ' &nbsp;·&nbsp; <a href="https://wa.me/255753959375" style="color:#ffffff;text-decoration:none;">WhatsApp</a>'
        . ' &nbsp;·&nbsp; <a href="mailto:info@gilleadsafaris.com" style="color:#ffffff;text-decoration:none;">info@gilleadsafaris.com</a></p>'
        . '<p style="margin:0;font-family:' . $b['sans'] . ';font-size:12px;color:' . $b['tan'] . ';">© ' . $year . ' Gillead Safaris Tanzania Ltd · Arusha, Tanzania</p>'
        . ($footerNote !== '' ? '<p style="margin:12px 0 0;font-family:' . $b['sans'] . ';font-size:12px;color:#cfc6b6;">' . $footerNote . '</p>' : '')
        . '</td></tr>'

        . '</table></td></tr></table></body></html>';
}
