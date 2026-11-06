-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. guest primary key. Expected: pk_guest, SQLSTATE 23505.
INSERT INTO portfolio."guest" ("guest_id", "full_name", "email")
VALUES (101, 'Jordan Park', 'jordan.park@example.test');

-- 2. guest unique email. Expected: uq_guest_0, SQLSTATE 23505.
INSERT INTO portfolio."guest" ("guest_id", "full_name", "email")
VALUES (1001, 'Jordan Park', 'avery.chen@example.test');

-- 3. guest full name not null. Expected: full_name, SQLSTATE 23502.
INSERT INTO portfolio."guest" ("guest_id", "full_name", "email")
VALUES (1002, NULL, 'jordan.park@example.test');

-- 4. room primary key. Expected: pk_room, SQLSTATE 23505.
INSERT INTO portfolio."room" ("room_id", "room_number", "capacity", "nightly_rate", "is_active")
VALUES (201, '103', 2, 155, TRUE);

-- 5. room unique number. Expected: uq_room_0, SQLSTATE 23505.
INSERT INTO portfolio."room" ("room_id", "room_number", "capacity", "nightly_rate", "is_active")
VALUES (1003, '101', 2, 155, TRUE);

-- 6. reservation primary key. Expected: pk_reservation, SQLSTATE 23505.
INSERT INTO portfolio."reservation" ("reservation_id", "guest_id", "room_id", "check_in", "check_out", "status")
VALUES (301, 102, 202, '2026-12-15', '2026-12-18', 'pending');

-- 7. reservation guest foreign key. Expected: fk_reservation_0, SQLSTATE 23503.
INSERT INTO portfolio."reservation" ("reservation_id", "guest_id", "room_id", "check_in", "check_out", "status")
VALUES (1004, 1005, 201, '2026-12-15', '2026-12-18', 'pending');

-- 8. reservation room foreign key. Expected: fk_reservation_1, SQLSTATE 23503.
INSERT INTO portfolio."reservation" ("reservation_id", "guest_id", "room_id", "check_in", "check_out", "status")
VALUES (1006, 101, 1007, '2026-12-15', '2026-12-18', 'pending');

-- 9. reservation dates ordered. Expected: reservation_dates_ordered, SQLSTATE 23514.
INSERT INTO portfolio."reservation" ("reservation_id", "guest_id", "room_id", "check_in", "check_out", "status")
VALUES (1008, 101, 201, '2026-12-18', '2026-12-15', 'pending');

-- 10. reservation partial unique. Expected: confirmed_room_checkin_unique, SQLSTATE 23505.
INSERT INTO portfolio."reservation" ("reservation_id", "guest_id", "room_id", "check_in", "check_out", "status")
VALUES (1009, 102, 201, '2026-12-10', '2026-12-12', 'confirmed');
