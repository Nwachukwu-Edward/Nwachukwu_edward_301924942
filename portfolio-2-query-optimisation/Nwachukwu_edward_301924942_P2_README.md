# Hotel Reservation System — SQL queries

## 1. Show related reservation, guest, room records (up to 20).

```sql
SELECT t0."reservation_id" AS "reservation_reservation_id",
       t0."check_in" AS "reservation_check_in",
       t1."guest_id" AS "guest_guest_id",
       t1."full_name" AS "guest_full_name",
       t2."room_id" AS "room_room_id",
       t2."room_number" AS "room_room_number"
FROM portfolio."reservation" t0
JOIN portfolio."guest" t1 ON t0."guest_id" = t1."guest_id"
JOIN portfolio."room" t2 ON t0."room_id" = t2."room_id"
ORDER BY t0."reservation_id", t1."guest_id", t2."room_id"
LIMIT 20;
```

| reservation_reservation_id | reservation_check_in | guest_guest_id | guest_full_name | room_room_id | room_room_number |
| --- | --- | --- | --- | --- | --- |
| 301 | 2026-12-10 | 101 | Avery Chen | 201 | 101 |
| 302 | 2026-12-10 | 102 | Morgan Lee | 202 | 102 |

## 2. Find reservation records where check_in matches "2026-12-10" (up to 20).

```sql
SELECT * FROM portfolio."reservation"
WHERE "check_in" IS NOT DISTINCT FROM '2026-12-10'
ORDER BY "reservation_id"
LIMIT 20;
```

| reservation_id | guest_id | room_id | check_in | check_out | status |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-12-10 | 2026-12-13 | confirmed |
| 302 | 102 | 202 | 2026-12-10 | 2026-12-12 | pending |

## 3. Count reservation records for each guest_id (up to 20 groups).

```sql
SELECT "guest_id", count(*) AS record_count
FROM portfolio."reservation"
GROUP BY "guest_id"
ORDER BY record_count DESC, "guest_id" NULLS LAST
LIMIT 20;
```

| guest_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |

## 4. Find guest records where full_name matches "Avery Chen" (up to 20).

```sql
SELECT * FROM portfolio."guest"
WHERE "full_name" IS NOT DISTINCT FROM 'Avery Chen'
ORDER BY "guest_id"
LIMIT 20;
```

| guest_id | full_name | email |
| --- | --- | --- |
| 101 | Avery Chen | avery.chen@example.test |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.189 | 1.176, 1.189, 1.201 | Sort → Seq Scan | 139 |
| After index | 0.227 | 0.225, 0.227, 0.232 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 30 |

The median execution time changed from 1.189 ms to 0.227 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=1.148..1.15 rows=25 loops=1)
  Seq Scan on reservation (actual time=0.019..1.112 rows=25 loops=1)
Planning Time: 0.34 ms
Execution Time: 1.176 ms
```

### Before index, run 2

```text
Sort (actual time=1.159..1.161 rows=25 loops=1)
  Seq Scan on reservation (actual time=0.019..1.123 rows=25 loops=1)
Planning Time: 0.34 ms
Execution Time: 1.189 ms
```

### Before index, run 3

```text
Sort (actual time=1.171..1.173 rows=25 loops=1)
  Seq Scan on reservation (actual time=0.018..1.136 rows=25 loops=1)
Planning Time: 0.334 ms
Execution Time: 1.201 ms
```

### After index, run 1

```text
Sort (actual time=0.18..0.182 rows=25 loops=1)
  Bitmap Heap Scan on reservation (actual time=0.03..0.142 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=25 loops=1)
Planning Time: 0.594 ms
Execution Time: 0.225 ms
```

### After index, run 2

```text
Sort (actual time=0.182..0.184 rows=25 loops=1)
  Bitmap Heap Scan on reservation (actual time=0.032..0.145 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=25 loops=1)
Planning Time: 0.559 ms
Execution Time: 0.227 ms
```

### After index, run 3

```text
Sort (actual time=0.185..0.187 rows=25 loops=1)
  Bitmap Heap Scan on reservation (actual time=0.049..0.146 rows=25 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=25 loops=1)
Planning Time: 0.558 ms
Execution Time: 0.232 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Nwachukwu_edward_301924942_P2_Queries.sql, then Nwachukwu_edward_301924942_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Nwachukwu_edward_301924942_P2_QueryResults.png) · [Index comparison](screenshots/Nwachukwu_edward_301924942_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

