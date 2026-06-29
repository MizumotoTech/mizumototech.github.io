CREATE TABLE IF NOT EXISTS contact_inquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  source_page TEXT,
  name TEXT NOT NULL,
  company TEXT,
  work_email TEXT NOT NULL,
  service_area TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  user_agent_hash TEXT,
  cf_country TEXT,
  cf_colo TEXT
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at
ON contact_inquiries (created_at);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status
ON contact_inquiries (status);
