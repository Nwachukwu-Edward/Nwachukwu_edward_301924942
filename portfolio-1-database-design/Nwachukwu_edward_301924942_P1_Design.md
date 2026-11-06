# Hotel Reservation System — database design

My case study records guest, room, reservation.

## Users

- Guests checking reservation details
- Front-desk staff managing bookings
- Managers reviewing room reservations

## Main operations

- Create and confirm a reservation
- Find reservations for a date range
- Review reservations by room and month

## Entities

| Entity | Information stored |
| --- | --- |
| guest | Stores the person associated with reservations. |
| room | Stores bookable rooms, capacity, nightly rate, and availability. |
| reservation | Records one guest's stay in one room. |

## guest

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| guest_id | BIGINT | PK | Yes |
| full_name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
- Unique key: (email).

## room

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| room_id | BIGINT | PK | Yes |
| room_number | TEXT | Unique | Yes |
| capacity | INTEGER |  | Yes |
| nightly_rate | NUMERIC(18,2) |  | Yes |
| is_active | BOOLEAN |  | Yes |
- Unique key: (room_number).

## reservation

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| reservation_id | BIGINT | PK | Yes |
| guest_id | BIGINT | FK | Yes |
| room_id | BIGINT | FK | Yes |
| check_in | DATE |  | Yes |
| check_out | DATE |  | Yes |
| status | TEXT |  | Yes |
- guest_id → guest.guest_id
- room_id → room.room_id

## Relationships and business rules

- Each guest email identifies at most one guest.
- Each room number identifies at most one room.
- Every reservation guest_id references guest.guest_id.
- Every reservation room_id references room.room_id.
- The check-out date must be later than the check-in date.
- A partial unique rule allows at most one confirmed reservation for each room_id and check_in combination.

## Assumptions

- Each reservation is for exactly one guest and one room.
- Guest, room, and reservation identifiers are globally unique single-column IDs.
- A reservation references an existing guest and room.
- Check-out must be later than check-in.
- At most one confirmed reservation may have the same room and check-in date; overlapping stays are outside this simplified rule.
- Reservation statuses are pending, confirmed, or cancelled.

