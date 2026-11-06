# Hotel Reservation System — ER diagram

```mermaid
erDiagram
    direction LR
    guest {
        bigint guest_id PK
        text full_name
        text email UK
    }
    room {
        bigint room_id PK
        text room_number UK
        integer capacity
        numeric nightly_rate
        boolean is_active
    }
    reservation {
        bigint reservation_id PK
        bigint guest_id FK
        bigint room_id FK
        date check_in
        date check_out
        text status
    }
    guest ||--o{ reservation : "guest_id"
    room ||--o{ reservation : "room_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Nwachukwu_edward_301924942_ERDiagram.png)
