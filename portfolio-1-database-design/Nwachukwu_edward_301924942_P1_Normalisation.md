# Hotel Reservation System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| guest_id | reservation records (list) |
| --- | --- |
| 101 | [301] |
| 102 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| reservation.reservation_id | reservation.guest_id | reservation.room_id | reservation.status | guest.guest_id | guest.full_name | room.room_id | room.room_number |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | confirmed | 101 | Avery Chen | 201 | 101 |
| 302 | 102 | 202 | pending | 102 | Morgan Lee | 202 | 102 |

Key: reservation_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## reservation_example

| reservation.reservation_id | reservation.guest_id | reservation.room_id | reservation.status | guest.guest_id | guest.full_name | room.room_id | room.room_number |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | confirmed | 101 | Avery Chen | 201 | 101 |
| 302 | 102 | 202 | pending | 102 | Morgan Lee | 202 | 102 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## guest

| guest_id | full_name | email |
| --- | --- | --- |
| 101 | Avery Chen | avery.chen@example.test |
| 102 | Morgan Lee | morgan.lee@example.test |

## room

| room_id | room_number | capacity | nightly_rate | is_active |
| --- | --- | --- | --- | --- |
| 201 | 101 | 2 | 145 | true |
| 202 | 102 | 3 | 180 | true |

## reservation

| reservation_id | guest_id | room_id | check_in | check_out | status |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-12-10 | 2026-12-13 | confirmed |
| 302 | 102 | 202 | 2026-12-10 | 2026-12-12 | pending |

## Dependencies

- guest: (guest_id) → full_name, email
- room: (room_id) → room_number, capacity, nightly_rate, is_active
- reservation: (reservation_id) → guest_id, room_id, check_in, check_out, status

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
