// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("reservation_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("reservation_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "reservation_created",
                    "reservation_confirmed"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "reservation"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "reservation_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("reservation_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reservation_created",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 301
            },
            "snapshot": {
                "reservation_id": 301,
                "guest_id": 101,
                "room_id": 201,
                "check_in": "2026-12-10",
                "check_out": "2026-12-13",
                "status": "confirmed"
            }
        },
        "embedded": {
            "guest": [
                {
                    "key": {
                        "guest_id": 101
                    },
                    "snapshot": {
                        "guest_id": 101,
                        "full_name": "Avery Chen",
                        "email": "avery.chen@example.test"
                    },
                    "via": [
                        "reservation.guest_id → guest"
                    ]
                }
            ],
            "room": [
                {
                    "key": {
                        "room_id": 201
                    },
                    "snapshot": {
                        "room_id": 201,
                        "room_number": "101",
                        "capacity": 2,
                        "nightly_rate": 145,
                        "is_active": true
                    },
                    "via": [
                        "reservation.room_id → room"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reservation_confirmed",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 301
            },
            "snapshot": {
                "reservation_id": 301,
                "guest_id": 101,
                "room_id": 201,
                "check_in": "2026-12-10",
                "check_out": "2026-12-13",
                "status": "confirmed"
            }
        },
        "embedded": {
            "guest": [
                {
                    "key": {
                        "guest_id": 101
                    },
                    "snapshot": {
                        "guest_id": 101,
                        "full_name": "Avery Chen",
                        "email": "avery.chen@example.test"
                    },
                    "via": [
                        "reservation.guest_id → guest"
                    ]
                }
            ],
            "room": [
                {
                    "key": {
                        "room_id": 201
                    },
                    "snapshot": {
                        "room_id": 201,
                        "room_number": "101",
                        "capacity": 2,
                        "nightly_rate": 145,
                        "is_active": true
                    },
                    "via": [
                        "reservation.room_id → room"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "cancellation_reason": "illustrative cancellation_reason",
                "booking_channel": "illustrative booking_channel",
                "promotion_code": "illustrative promotion_code"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reservation_created",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 302
            },
            "snapshot": {
                "reservation_id": 302,
                "guest_id": 102,
                "room_id": 202,
                "check_in": "2026-12-10",
                "check_out": "2026-12-12",
                "status": "pending"
            }
        },
        "embedded": {
            "guest": [
                {
                    "key": {
                        "guest_id": 102
                    },
                    "snapshot": {
                        "guest_id": 102,
                        "full_name": "Morgan Lee",
                        "email": "morgan.lee@example.test"
                    },
                    "via": [
                        "reservation.guest_id → guest"
                    ]
                }
            ],
            "room": [
                {
                    "key": {
                        "room_id": 202
                    },
                    "snapshot": {
                        "room_id": 202,
                        "room_number": "102",
                        "capacity": 3,
                        "nightly_rate": 180,
                        "is_active": true
                    },
                    "via": [
                        "reservation.room_id → room"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "reservation_confirmed",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "reservation",
            "key": {
                "reservation_id": 302
            },
            "snapshot": {
                "reservation_id": 302,
                "guest_id": 102,
                "room_id": 202,
                "check_in": "2026-12-10",
                "check_out": "2026-12-12",
                "status": "pending"
            }
        },
        "embedded": {
            "guest": [
                {
                    "key": {
                        "guest_id": 102
                    },
                    "snapshot": {
                        "guest_id": 102,
                        "full_name": "Morgan Lee",
                        "email": "morgan.lee@example.test"
                    },
                    "via": [
                        "reservation.guest_id → guest"
                    ]
                }
            ],
            "room": [
                {
                    "key": {
                        "room_id": 202
                    },
                    "snapshot": {
                        "room_id": 202,
                        "room_number": "102",
                        "capacity": 3,
                        "nightly_rate": 180,
                        "is_active": true
                    },
                    "via": [
                        "reservation.room_id → room"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "cancellation_reason": "illustrative cancellation_reason",
                "booking_channel": "illustrative booking_channel",
                "promotion_code": "illustrative promotion_code"
            }
        }
    }
]));
  await db.getCollection("reservation_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("reservation_events").find({"eventType":"reservation_created"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("reservation_events").find({"source.key.reservation_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("reservation_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("reservation_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("reservation_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "reservation_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "reservation",
        "key": {
            "reservation_id": 301
        },
        "snapshot": {
            "reservation_id": 301,
            "guest_id": 101,
            "room_id": 201,
            "check_in": "2026-12-10",
            "check_out": "2026-12-13",
            "status": "confirmed"
        }
    },
    "embedded": {
        "guest": [
            {
                "key": {
                    "guest_id": 101
                },
                "snapshot": {
                    "guest_id": 101,
                    "full_name": "Avery Chen",
                    "email": "avery.chen@example.test"
                },
                "via": [
                    "reservation.guest_id → guest"
                ]
            }
        ],
        "room": [
            {
                "key": {
                    "room_id": 201
                },
                "snapshot": {
                    "room_id": 201,
                    "room_number": "101",
                    "capacity": 2,
                    "nightly_rate": 145,
                    "is_active": true
                },
                "via": [
                    "reservation.room_id → room"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("reservation_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "reservation_created",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "reservation",
        "key": {
            "reservation_id": 301
        },
        "snapshot": {
            "reservation_id": 301,
            "guest_id": 101,
            "room_id": 201,
            "check_in": "2026-12-10",
            "check_out": "2026-12-13",
            "status": "confirmed"
        }
    },
    "embedded": {
        "guest": [
            {
                "key": {
                    "guest_id": 101
                },
                "snapshot": {
                    "guest_id": 101,
                    "full_name": "Avery Chen",
                    "email": "avery.chen@example.test"
                },
                "via": [
                    "reservation.guest_id → guest"
                ]
            }
        ],
        "room": [
            {
                "key": {
                    "room_id": 201
                },
                "snapshot": {
                    "room_id": 201,
                    "room_number": "101",
                    "capacity": 2,
                    "nightly_rate": 145,
                    "is_active": true
                },
                "via": [
                    "reservation.room_id → room"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("reservation_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
