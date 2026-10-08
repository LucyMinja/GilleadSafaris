<?php
// Settings for the backend. On the server, copy this file to `config.php`
// and fill in the real values. `config.php` is git-ignored: passwords never
// go to GitHub.

return [
    // MySQL connection — created in cPanel → "MySQL Databases".
    'db' => [
        'host'     => 'localhost',
        'name'     => 'CPANELUSER_gillead',
        'user'     => 'CPANELUSER_gillead',
        'password' => 'CHANGE_ME',
    ],

    // Public address of the website — used for links and the logo in emails.
    'site_url' => 'https://www.gilleadsafaris.com',

    // Who receives new-enquiry emails, and the address emails come from.
    'notify_to' => 'info@gilleadsafaris.com',
    'mail_from' => 'info@gilleadsafaris.com',

    // Websites allowed to send form data here (CORS).
    'allowed_origins' => [
        'https://www.gilleadsafaris.com',
        'https://gilleadsafaris.com',
        'http://localhost:3000',
    ],

    // Spam protection: max submissions from one IP address per hour.
    'max_per_hour' => 5,

    // false on the live server — set true locally to skip sending real email.
    'debug' => false,
];
