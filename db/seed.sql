INSERT INTO members (first_name, last_name, role, team, phone, email, joined_at)
VALUES
  ('Adebayo', 'Johnson', 'Deacon', 'Ushering', '+234 801 234 5678', 'adebayo@email.com', '2020-01-01'),
  ('Grace', 'Okonkwo', 'Member', 'Choir', '+234 802 346 6789', 'grace@email.com', '2019-03-01'),
  ('Emmanuel', 'Eze', 'Elder', 'Finance', '+234 803 456 7890', 'emmanuel@email.com', '2015-01-01'),
  ('Blessing', 'Nwachukwu', 'Member', 'Children''s Ministry', '+234 804 567 8901', 'blessing@email.com', '2021-09-01'),
  ('Samuel', 'Adeyemi', 'Member', 'Leadership', '+234 805 678 9012', 'samuel@email.com', '2010-01-01'),
  ('Mercy', 'Okafor', 'Member', 'Media', '+234 806 789 0123', 'mercy@email.com', '2022-02-01')
ON CONFLICT DO NOTHING;

INSERT INTO events (title, start_at, location, expected_count, category)
VALUES
  ('Sunday Worship Service', '2026-03-09 09:00:00+00', 'Main Sanctuary', 342, 'Worship'),
  ('Youth Fellowship', '2026-03-11 17:00:00+00', 'Youth Hall', 89, 'Fellowship'),
  ('Bible Study - Book of Romans', '2026-03-12 18:30:00+00', 'Room 201', 120, 'Study'),
  ('Prayer Meeting', '2026-03-13 06:00:00+00', 'Chapel', 85, 'Prayer'),
  ('Women''s Conference', '2026-03-15 10:00:00+00', 'Main Sanctuary', 250, 'Conference'),
  ('Children''s Sunday School', '2026-03-16 09:00:00+00', 'Children''s Wing', 78, 'Education')
ON CONFLICT DO NOTHING;

INSERT INTO projects (title, status, raised_amount, goal_amount)
VALUES
  ('New Church Building', 'Active', 32500000, 45000000),
  ('Youth Center Renovation', 'Active', 5200000, 8000000),
  ('Community Outreach Program', 'Completed', 2500000, 2500000),
  ('Sound System Upgrade', 'Active', 1800000, 3200000),
  ('Children''s Wing Extension', 'Planning', 3800000, 12000000)
ON CONFLICT DO NOTHING;

INSERT INTO offertory_records (date, type, givers, amount)
VALUES
  ('2026-03-02', 'Sunday Service', 312, 485000),
  ('2026-02-23', 'Sunday Service', 340, 520000),
  ('2026-02-16', 'Special Offering', 289, 750000),
  ('2026-02-09', 'Sunday Service', 298, 445000),
  ('2026-02-02', 'Sunday Service', 325, 510000),
  ('2026-01-26', 'Thanksgiving', 410, 1200000)
ON CONFLICT DO NOTHING;

INSERT INTO contributions (member_id, type, project, date, amount)
VALUES
  ((SELECT id FROM members WHERE email = 'adebayo@email.com'), 'Tithe', 'General Fund', '2026-03-05', 150000),
  ((SELECT id FROM members WHERE email = 'grace@email.com'), 'Offering', 'Building Fund', '2026-03-04', 50000),
  ((SELECT id FROM members WHERE email = 'emmanuel@email.com'), 'Tithe', 'General Fund', '2026-03-03', 200000),
  ((SELECT id FROM members WHERE email = 'blessing@email.com'), 'Donation', 'Youth Center', '2026-03-02', 500000),
  ((SELECT id FROM members WHERE email = 'samuel@email.com'), 'Tithe', 'General Fund', '2026-03-02', 75000),
  ((SELECT id FROM members WHERE email = 'mercy@email.com'), 'Seed', 'Outreach', '2026-03-01', 100000)
ON CONFLICT DO NOTHING;
