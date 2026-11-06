-- Fictional sample records for Hotel Reservation System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."guest" ("guest_id", "full_name", "email") VALUES (101, 'Avery Chen', 'avery.chen@example.test');
INSERT INTO portfolio."guest" ("guest_id", "full_name", "email") VALUES (102, 'Morgan Lee', 'morgan.lee@example.test');
INSERT INTO portfolio."room" ("room_id", "room_number", "capacity", "nightly_rate", "is_active") VALUES (201, '101', 2, 145, TRUE);
INSERT INTO portfolio."room" ("room_id", "room_number", "capacity", "nightly_rate", "is_active") VALUES (202, '102', 3, 180, TRUE);
INSERT INTO portfolio."reservation" ("reservation_id", "guest_id", "room_id", "check_in", "check_out", "status") VALUES (301, 101, 201, '2026-12-10', '2026-12-13', 'confirmed');
INSERT INTO portfolio."reservation" ("reservation_id", "guest_id", "room_id", "check_in", "check_out", "status") VALUES (302, 102, 202, '2026-12-10', '2026-12-12', 'pending');
COMMIT;
