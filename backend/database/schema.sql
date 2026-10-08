-- Gillead Safaris — database tables
-- Run once: cPanel → phpMyAdmin → select your database → "SQL" tab → paste → Go.

-- Every form on the website (Booking, Contact, Newsletter) saves one row here.
CREATE TABLE IF NOT EXISTS enquiries (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  type        ENUM('booking', 'contact', 'newsletter') NOT NULL,
  status      ENUM('new', 'replied', 'quoted', 'booked', 'closed') NOT NULL DEFAULT 'new',
  name        VARCHAR(120) NOT NULL,
  email       VARCHAR(190) NOT NULL,
  phone       VARCHAR(40)  NULL,
  message     TEXT         NULL,
  details     JSON         NULL,
  ip_address  VARCHAR(45)  NULL,
  token       CHAR(32)     NULL,          -- newsletter: secret for the unsubscribe link
  unsubscribed_at DATETIME NULL,          -- newsletter: set when they unsubscribe
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_created (created_at),
  INDEX idx_type_status (type, status),
  INDEX idx_ip_created (ip_address, created_at),
  UNIQUE KEY uniq_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
