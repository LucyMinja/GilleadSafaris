<?php
// Receives every form on the website (Booking, Contact, Newsletter):
// checks it, saves it to the `enquiries` table, and emails the team.
// The website sends JSON with POST; this file always answers with JSON.

declare(strict_types=1);

require __DIR__ . '/db.php';
$config = require __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

// Send a JSON answer and stop.
function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

// ── 1. CORS: only our own website may post here ──────────────────────────
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    respond(204, []); // the browser's "may I?" check before the real request
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Use POST.']);
}

// ── 2. Read the JSON body ─────────────────────────────────────────────────
$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

// ── 3. Honeypot: a hidden field real people never fill in ────────────────
if (!empty($data['website'])) {
    respond(200, ['ok' => true]); // pretend success so the bot moves on
}

// ── 4. Validate ───────────────────────────────────────────────────────────
$clean = fn($v, int $max) => mb_substr(trim((string)($v ?? '')), 0, $max);

$type    = $data['type'] ?? '';
$name    = $clean($data['name'] ?? '', 120);
$email   = $clean($data['email'] ?? '', 190);
$phone   = $clean($data['phone'] ?? '', 40);
$message = $clean($data['message'] ?? '', 5000);
$details = is_array($data['details'] ?? null) ? $data['details'] : null;

$errors = [];
if (!in_array($type, ['booking', 'contact', 'newsletter'], true)) $errors['type'] = 'Unknown form.';
if ($name === '')                                                 $errors['name'] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))                   $errors['email'] = 'Please enter a valid email.';
if ($type === 'contact' && $message === '')                       $errors['message'] = 'Please write a message.';
if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

// ── 5. Rate limit: no more than N per hour from one IP ───────────────────
$ip  = $_SERVER['REMOTE_ADDR'] ?? null;
$pdo = db($config);

$count = $pdo->prepare('SELECT COUNT(*) FROM enquiries WHERE ip_address = ? AND created_at > NOW() - INTERVAL 1 HOUR');
$count->execute([$ip]);
if ((int)$count->fetchColumn() >= $config['max_per_hour']) {
    respond(429, ['ok' => false, 'error' => 'Too many requests. Please try again later.']);
}

// ── 6. Save (prepared statement = safe from SQL injection) ───────────────
$insert = $pdo->prepare(
    'INSERT INTO enquiries (type, name, email, phone, message, details, ip_address)
     VALUES (:type, :name, :email, :phone, :message, :details, :ip)'
);
$insert->execute([
    ':type'    => $type,
    ':name'    => $name,
    ':email'   => $email,
    ':phone'   => $phone !== '' ? $phone : null,
    ':message' => $message !== '' ? $message : null,
    ':details' => $details ? json_encode($details) : null,
    ':ip'      => $ip,
]);
$id = (int)$pdo->lastInsertId();

// ── 7. Email the team (never break the response if mail fails) ───────────
if (!$config['debug']) {
    $subject = "New {$type} enquiry #{$id} from {$name}";
    $lines = ["Type: {$type}", "Name: {$name}", "Email: {$email}"];
    if ($phone !== '')   $lines[] = "Phone: {$phone}";
    if ($message !== '') $lines[] = "\nMessage:\n{$message}";
    if ($details)        $lines[] = "\nDetails:\n" . json_encode($details, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    $headers = implode("\r\n", [
        "From: Gillead Safaris Website <{$config['mail_from']}>",
        "Reply-To: {$name} <{$email}>",
        'Content-Type: text/plain; charset=utf-8',
    ]);
    @mail($config['notify_to'], $subject, implode("\n", $lines), $headers);
}

respond(201, ['ok' => true, 'id' => $id]);
