# SPOTTS Partner API Documentation

Complete API reference for third-party calendar sync partners integrating with the SPOTTS booking platform.

---

## Overview

The SPOTTS Partner API allows approved third-party platforms to integrate with our sports facility booking system. Partners can view court availability, create time slot blocks (reservations), and manage their bookings programmatically.

### Base URL

```
https://YOUR_BACKEND_DOMAIN/api/v1/partner
```

> **Note:** Replace `YOUR_BACKEND_DOMAIN` with your actual production API domain (e.g., `spotts-api-production.up.railway.app` or your custom domain).

### Key Concepts

| Term | Description |
|------|-------------|
| **Courts** | Individual playing areas within a venue (tennis courts, football pitches, etc.) |
| **Venues** | Sports facilities that contain one or more courts |
| **Blocks** | Time slot reservations created by partners (prevents customers from booking) |
| **Venue Scoping** | Partners may be restricted to specific venues |

### Important: Cancellation Responsibility

> **⚠️ CRITICAL:** When a booking is **cancelled** on your platform (and the slot is still in the future), you **MUST** release the block on SPOTTS immediately using the [Release Block](#7-release-block) endpoint. Failure to do so will leave the slot blocked, preventing other customers from booking.

Note: Releasing blocks for **completed** or **no_show** bookings is optional — these slots are already in the past and don't affect availability. However, releasing them helps with tracking and keeping your block list clean.

---

## Court Relationships & Blocking Behavior

Understanding how courts relate to each other is essential for managing availability correctly.

### Parent/Child Courts

Some venues have courts that can be divided into smaller sections (e.g., a full football field can be split into two half-fields).

| Court Type | Description | Blocking Behavior |
|------------|-------------|-------------------|
| **Parent Court** | Full-size court (e.g., "Full Field") | Booking blocks **ALL child courts** of the same sport |
| **Child Court** | Sub-section of a parent (e.g., "Half 1", "Half 2") | Booking blocks the **parent only** (sibling courts remain available) |
| **Standalone Court** | Independent court with no parent/children | Booking only blocks itself |

**Example Scenario:**
- "Football Full Field" (parent) has two children: "Half 1" and "Half 2"
- If you block **"Football Full Field"** → both "Half 1" and "Half 2" become unavailable
- If you block **"Half 1"** → "Football Full Field" becomes unavailable, but "Half 2" is still bookable

**How to Identify:**
Check the `is_parent_court`, `is_child_court`, and `parent_court_id` fields in the court object:
- `is_parent_court: true` = This court has children (booking blocks all children)
- `is_child_court: true` = This court is part of a parent (booking blocks the parent)
- `parent_court_id: null` and `is_parent_court: false` = Standalone court

### Cross-Sport Physical Space Sharing

Multiple sports can share the same physical court space. For example, a multipurpose hall might be configured for Basketball, Tennis, or Badminton at different times.

**Blocking Rules:**
When you book a court on a shared physical space:

| You Book | What Gets Blocked |
|----------|-------------------|
| **Full Court** | Entire physical space (all sports, all configurations) |
| **Half Court** | • Parent court (same sport)<br>• All full courts (other sports)<br>• Corresponding half courts (other sports with same number)<br>• **Does NOT block** the other half (different number) |

**Example Scenario:**
Basketball, Tennis, and Football all share "Multipurpose Hall A":
- Each sport has: Full Court, Half 1, Half 2
- If you block **Basketball Half 1**:
  - ✅ Basketball Full → blocked
  - ✅ Tennis Half 1 → blocked (same physical half)
  - ✅ Football Half 1 → blocked (same physical half)
  - ✅ All Full Courts → blocked (can't book full if half is taken)
  - ❌ Basketball Half 2 → **available** (different physical half)
  - ❌ Tennis Half 2 → **available** (different physical half)
  - ❌ Football Half 2 → **available** (different physical half)

**How It Works:**
The API automatically handles all blocking logic. When you create a block, related courts are blocked accordingly. When you check availability, slots marked as `unavailable` are blocked due to parent/child or cross-sport relationships.

**Best Practice:**
Always check availability before attempting to create a block. The API will reject blocks on unavailable slots with a `SLOT_UNAVAILABLE` error.

---

## Authentication

All API requests require a Bearer token in the `Authorization` header.

```
Authorization: Bearer YOUR_API_KEY
```

### API Key Format

API keys follow the format: `spk_` followed by 48 random characters.

Example: `spk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4`

API keys are provided once during partner onboarding. They cannot be retrieved again — only rotated (which invalidates the old key).

### Authentication Errors

| Status | Error Code | Description |
|--------|------------|-------------|
| `401` | `MISSING_API_KEY` | No `Authorization` header or missing `Bearer` prefix |
| `401` | `INVALID_API_KEY` | The API key does not match any active partner |
| `401` | `API_KEY_REVOKED` | This API key has been permanently revoked |
| `403` | `PARTNER_SUSPENDED` | Your partner account is suspended |

### Example Error Response

```json
{
  "success": false,
  "error": "MISSING_API_KEY",
  "message": "Authorization header with Bearer token is required."
}
```

---

## Rate Limiting

Rate limits are applied per partner, per minute, with separate limits for read and write operations.

| Operation Type | HTTP Methods | Default Limit |
|----------------|--------------|---------------|
| **Read** | `GET` | 60 requests/min |
| **Write** | `POST`, `PUT`, `PATCH`, `DELETE` | 30 requests/min |

### Rate Limit Headers

Every response includes rate limit headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 57
```

### Rate Limit Exceeded Response

```
HTTP 429 Too Many Requests

X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706140800
Retry-After: 60
```

```json
{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded. Maximum 60 read requests per minute."
}
```

---

## Response Format

All responses follow a consistent JSON structure.

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional description"
}
```

### Error Response

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created (new resource) |
| `400` | Bad request (invalid parameters) |
| `401` | Unauthorized (invalid/missing API key) |
| `403` | Forbidden (suspended account or venue access denied) |
| `404` | Resource not found |
| `409` | Conflict (slot unavailable) |
| `422` | Validation error (invalid input) |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

---

## Endpoints

### 1. List Courts

Retrieve all courts the partner has access to.

```
GET /v1/partner/courts
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `venue_id` | integer | No | Filter courts by specific venue ID |
| `sport` | string | No | Filter by sport slug (e.g., `football`, `tennis`, `badminton`) |

#### Example Request

```bash
curl -X GET "https://YOUR_BACKEND_DOMAIN/api/v1/partner/courts?sport=tennis" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

#### Success Response `200 OK`

```json
{
  "success": true,
  "data": {
    "courts": [
      {
        "court_id": 15,
        "court_name": "Court A",
        "venue_id": 3,
        "venue_name": "Abuja Tennis Club",
        "venue_slug": "abuja-tennis-club",
        "sport": {
          "id": 4,
          "name": "Tennis",
          "slug": "tennis"
        },
        "is_parent_court": false,
        "is_child_court": false,
        "parent_court_id": null
      },
      {
        "court_id": 22,
        "court_name": "5-A-Side Pitch 1",
        "venue_id": 5,
        "venue_name": "Riverplate Sports Arena",
        "venue_slug": "riverplate-sports-arena",
        "sport": {
          "id": 1,
          "name": "Football",
          "slug": "football"
        },
        "is_parent_court": false,
        "is_child_court": true,
        "parent_court_id": 21
      }
    ],
    "total": 2
  }
}
```

#### Court Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `court_id` | integer | Unique court identifier |
| `court_name` | string | Display name of the court |
| `venue_id` | integer | Parent venue identifier |
| `venue_name` | string | Display name of the venue |
| `venue_slug` | string | URL-friendly venue identifier |
| `sport` | object\|null | Sport details (`id`, `name`, `slug`) or null |
| `is_parent_court` | boolean | Whether this is a parent/composite court (e.g., full field) |
| `is_child_court` | boolean | Whether this is a sub-court of a parent (e.g., half field) |
| `parent_court_id` | integer\|null | Parent court ID if this is a child court |

---

### 2. Get Court Availability

Check available time slots for a specific court on a given date.

```
GET /v1/partner/courts/{courtId}/availability
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `courtId` | integer | The court ID to check availability for |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | string | **Yes** | Date in `YYYY-MM-DD` format |

#### Validation Rules

- Date must be today or in the future (no past dates)
- Date must be within the partner's `max_advance_days` limit (default: 90 days)

#### Example Request

```bash
curl -X GET "https://YOUR_BACKEND_DOMAIN/api/v1/partner/courts/15/availability?date=2026-02-10" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

#### Success Response `200 OK` (Venue Open)

```json
{
  "success": true,
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-10",
    "is_open": true,
    "operating_hours": {
      "opening_time": "06:00",
      "closing_time": "22:00"
    },
    "slots": [
      {
        "start_time": "06:00",
        "end_time": "06:30",
        "status": "available"
      },
      {
        "start_time": "06:30",
        "end_time": "07:00",
        "status": "available"
      },
      {
        "start_time": "07:00",
        "end_time": "07:30",
        "status": "booked"
      },
      {
        "start_time": "07:30",
        "end_time": "08:00",
        "status": "booked"
      },
      {
        "start_time": "08:00",
        "end_time": "08:30",
        "status": "blocked"
      },
      {
        "start_time": "08:30",
        "end_time": "09:00",
        "status": "unavailable"
      }
    ]
  }
}
```

#### Success Response (Venue Closed)

```json
{
  "success": true,
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-09",
    "is_open": false,
    "reason": "Venue is closed on this day.",
    "slots": []
  }
}
```

#### Success Response (Blackout Date)

```json
{
  "success": true,
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-14",
    "is_open": false,
    "is_blackout": true,
    "reason": "Valentine's Day Tournament",
    "slots": []
  }
}
```

#### Slot Status Values

| Status | Description |
|--------|-------------|
| `available` | The slot is free and can be blocked |
| `booked` | Already booked by a customer through the app |
| `blocked` | Blocked by a partner via the API or by venue staff |
| `unavailable` | Blocked due to parent/child court relationship |

#### Slot Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `start_time` | string | Slot start time in `HH:MM` format |
| `end_time` | string | Slot end time in `HH:MM` format |
| `status` | string | One of: `available`, `booked`, `blocked`, `unavailable` |

#### Error Responses

| Status | Error Code | Condition |
|--------|------------|-----------|
| `400` | `DATE_IN_PAST` | The requested date is in the past |
| `400` | `DATE_TOO_FAR_AHEAD` | Date exceeds the partner's max advance days |
| `403` | `VENUE_ACCESS_DENIED` | Partner doesn't have access to this venue |
| `404` | `COURT_NOT_FOUND` | Court ID doesn't exist |
| `422` | `VALIDATION_ERROR` | Missing or invalid date parameter |

---

### 3. Create Block

Reserve a time slot on a court. This prevents customers from booking that slot.

```
POST /v1/partner/blocks
```

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `court_id` | integer | **Yes** | The court to block |
| `date` | string | **Yes** | Date in `YYYY-MM-DD` format |
| `start_time` | string | **Yes** | Start time in `HH:MM` format |
| `end_time` | string | **Yes** | End time in `HH:MM` format |
| `partner_reference` | string | **Yes** | Your unique reference ID for this block (max 255 chars) |

#### Example Request

```bash
curl -X POST "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks" \
  -H "Authorization: Bearer spk_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "court_id": 15,
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "partner_reference": "BLEU-BK-12345"
  }'
```

#### Success Response `201 Created`

```json
{
  "success": true,
  "message": "Block created successfully.",
  "data": {
    "block_reference": "EXT-A1B2",
    "partner_reference": "BLEU-BK-12345",
    "court_id": 15,
    "court_name": "Court A",
    "venue_id": 3,
    "venue_name": "Abuja Tennis Club",
    "sport": {
      "id": 4,
      "name": "Tennis",
      "slug": "tennis"
    },
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "status": "active",
    "created_at": "2026-02-05T14:30:00+01:00",
    "released_at": null
  }
}
```

#### Idempotency

If you send the same `partner_reference` twice, the API returns the existing block with `200 OK` instead of creating a duplicate. This makes the endpoint safe to retry on network failures.

```json
HTTP 200 OK

{
  "success": true,
  "message": "Block already exists with this reference.",
  "data": {
    "block_reference": "EXT-A1B2",
    "partner_reference": "BLEU-BK-12345",
    ...
  }
}
```

#### Error Responses

| Status | Error Code | Condition |
|--------|------------|-----------|
| `400` | `DATE_IN_PAST` | Cannot block a slot in the past |
| `400` | `DATE_TOO_FAR_AHEAD` | Date exceeds partner's max advance days |
| `400` | `VENUE_CLOSED` | Venue is closed on this day |
| `400` | `OUTSIDE_OPERATING_HOURS` | Slot is outside operating hours |
| `400` | `INVALID_TIME_RANGE` | End time must be after start time |
| `400` | `BLACKOUT_DATE` | This date is unavailable |
| `403` | `VENUE_ACCESS_DENIED` | Partner doesn't have access to this venue |
| `404` | `COURT_NOT_FOUND` | Court ID doesn't exist |
| `409` | `SLOT_UNAVAILABLE` | Time slot is already booked or blocked |
| `422` | `VALIDATION_ERROR` | Missing or invalid fields |

#### Slot Unavailable Error Example

```json
HTTP 409 Conflict

{
  "success": false,
  "error": "SLOT_UNAVAILABLE",
  "message": "This time slot is not available."
}
```

---

### 4. List Blocks

Retrieve all blocks created by your partner account.

```
GET /v1/partner/blocks
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `court_id` | integer | No | Filter by court ID |
| `date_from` | string | No | Start date filter (`YYYY-MM-DD`) |
| `date_to` | string | No | End date filter (`YYYY-MM-DD`) |
| `status` | string | No | Filter by status: `active`, `released` |
| `per_page` | integer | No | Results per page (max: 100, default: 50) |

#### Example Request

```bash
curl -X GET "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks?status=active&date_from=2026-02-01&per_page=50" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

#### Success Response `200 OK`

```json
{
  "success": true,
  "data": {
    "blocks": [
      {
        "block_reference": "EXT-A1B2",
        "partner_reference": "BLEU-BK-12345",
        "court_id": 15,
        "court_name": "Court A",
        "venue_id": 3,
        "venue_name": "Abuja Tennis Club",
        "sport": {
          "id": 4,
          "name": "Tennis",
          "slug": "tennis"
        },
        "date": "2026-02-10",
        "start_time": "10:00",
        "end_time": "11:00",
        "status": "active",
        "created_at": "2026-02-05T14:30:00+01:00",
        "released_at": null
      },
      {
        "block_reference": "EXT-C3D4",
        "partner_reference": "BLEU-BK-12346",
        "court_id": 16,
        "court_name": "Court B",
        "venue_id": 3,
        "venue_name": "Abuja Tennis Club",
        "sport": {
          "id": 4,
          "name": "Tennis",
          "slug": "tennis"
        },
        "date": "2026-02-10",
        "start_time": "14:00",
        "end_time": "15:00",
        "status": "active",
        "created_at": "2026-02-05T15:00:00+01:00",
        "released_at": null
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 50,
      "total": 2,
      "last_page": 1
    }
  }
}
```

---

### 5. Get Block Details

Retrieve details of a specific block by its reference.

```
GET /v1/partner/blocks/{blockReference}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `blockReference` | string | The SPOTTS-assigned block reference (e.g., `EXT-A1B2`) |

#### Example Request

```bash
curl -X GET "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks/EXT-A1B2" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

#### Success Response `200 OK`

```json
{
  "success": true,
  "data": {
    "block_reference": "EXT-A1B2",
    "partner_reference": "BLEU-BK-12345",
    "court_id": 15,
    "court_name": "Court A",
    "venue_id": 3,
    "venue_name": "Abuja Tennis Club",
    "sport": {
      "id": 4,
      "name": "Tennis",
      "slug": "tennis"
    },
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "status": "active",
    "created_at": "2026-02-05T14:30:00+01:00",
    "released_at": null
  }
}
```

#### Error Responses

| Status | Error Code | Condition |
|--------|------------|-----------|
| `404` | `BLOCK_NOT_FOUND` | Block reference doesn't exist or belongs to another partner |

---

### 6. Reschedule Block (Atomic)

Atomically reschedule a block to a new time slot. This endpoint ensures that either the reschedule succeeds completely (old block released, new block created), or fails completely — **no partial state where the old block is released but the new slot is unavailable**.

```
PUT /v1/partner/blocks/{blockReference}/reschedule
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `blockReference` | string | The SPOTTS-assigned block reference to reschedule |

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `court_id` | integer | **Yes** | The new court to block |
| `date` | string | **Yes** | New date in `YYYY-MM-DD` format |
| `start_time` | string | **Yes** | New start time in `HH:MM` format |
| `end_time` | string | **Yes** | New end time in `HH:MM` format |

#### Example Request

```bash
curl -X PUT "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks/EXT-A1B2/reschedule" \
  -H "Authorization: Bearer spk_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "court_id": 15,
    "date": "2026-02-12",
    "start_time": "14:00",
    "end_time": "15:00"
  }'
```

#### Success Response `200 OK`

```json
{
  "success": true,
  "message": "Block rescheduled successfully.",
  "data": {
    "old_block": {
      "block_reference": "EXT-A1B2",
      "court_id": 15,
      "date": "2026-02-10",
      "start_time": "10:00",
      "end_time": "11:00",
      "status": "released"
    },
    "new_block": {
      "block_reference": "EXT-C3D4",
      "partner_reference": "BLEU-BK-12345",
      "court_id": 15,
      "court_name": "Court A",
      "venue_id": 3,
      "venue_name": "Abuja Tennis Club",
      "date": "2026-02-12",
      "start_time": "14:00",
      "end_time": "15:00",
      "status": "active",
      "created_at": "2026-02-05T16:00:00+01:00"
    }
  }
}
```

#### Why Use This Instead of Release + Create?

The `release then create` approach is risky:

1. **Step 1:** Release old block at 10:00 → succeeds
2. **Step 2:** Create new block at 14:00 → **FAILS** (slot already taken)
3. **Result:** User has no booking at all!

This endpoint does it atomically — either both operations succeed, or neither does.

#### Error Responses

| Status | Error Code | Condition |
|--------|------------|-----------|
| `400` | `DATE_IN_PAST` | Cannot reschedule to a past date |
| `400` | `DATE_TOO_FAR_AHEAD` | Date exceeds partner's max advance days |
| `400` | `VENUE_CLOSED` | Venue is closed on the new day |
| `400` | `OUTSIDE_OPERATING_HOURS` | New slot is outside operating hours |
| `400` | `INVALID_TIME_RANGE` | End time must be after start time |
| `400` | `BLACKOUT_DATE` | New date is unavailable |
| `403` | `VENUE_ACCESS_DENIED` | Partner doesn't have access to the new venue |
| `404` | `BLOCK_NOT_FOUND` | Active block not found with this reference |
| `404` | `COURT_NOT_FOUND` | New court ID doesn't exist |
| `409` | `SLOT_UNAVAILABLE` | New time slot is already booked or blocked |

---

### 7. Release Block

Release (cancel) a block, making the time slot available again for customers. Use this for cancellations — for rescheduling, use the [Reschedule Block](#6-reschedule-block-atomic) endpoint instead.

> **⚠️ IMPORTANT:** You **MUST** call this endpoint when a booking is **cancelled** and the slot is still in the future. This frees up the slot so other customers can book it. Releasing blocks for completed/no_show bookings is optional (the time has passed, so it doesn't affect availability).

```
DELETE /v1/partner/blocks/{blockReference}
```

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `blockReference` | string | The SPOTTS-assigned block reference |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `reason` | string | No | Release reason (optional, but if provided must be one of: `cancelled`, `completed`, `no_show`) |

#### Example Request

```bash
curl -X DELETE "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks/EXT-A1B2?reason=completed" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

#### Success Response `200 OK`

```json
{
  "success": true,
  "message": "Block released successfully."
}
```

#### Success Response with Reason

```json
{
  "success": true,
  "message": "Block released successfully.",
  "release_reason": "completed"
}
```

#### Idempotency

If the block was already released, the API returns success:

```json
{
  "success": true,
  "message": "Block was already released."
}
```

#### Release Reasons

| Reason | Required? | Description |
|--------|-----------|-------------|
| `cancelled` | **Yes** (if slot is in future) | The booking was cancelled — releases the slot for others |
| `completed` | Optional | The session took place successfully — for tracking purposes only |
| `no_show` | Optional | The customer did not show up — for tracking purposes only |

> **Note:** `completed` and `no_show` don't affect availability since the time has already passed. Use them for data hygiene and reporting.

#### Error Responses

| Status | Error Code | Condition |
|--------|------------|-----------|
| `404` | `BLOCK_NOT_FOUND` | Block reference doesn't exist or belongs to another partner |
| `422` | `INVALID_REASON` | Invalid reason provided |

---

### 8. Webhook Deliveries

View the history of webhook deliveries sent to your configured webhook URL.

```
GET /v1/partner/webhooks/deliveries
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by delivery status: `success`, `failed`, `pending` |
| `event_type` | string | No | Filter by event type (e.g., `slot.booked`, `slot.freed`) |
| `per_page` | integer | No | Results per page (max: 100, default: 50) |

#### Example Request

```bash
curl -X GET "https://YOUR_BACKEND_DOMAIN/api/v1/partner/webhooks/deliveries?status=failed&per_page=20" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

#### Success Response `200 OK`

```json
{
  "success": true,
  "data": {
    "deliveries": [
      {
        "event_id": "evt_abc123_42",
        "event_type": "slot.freed",
        "status": "success",
        "attempts": 1,
        "response_status": 200,
        "created_at": "2026-02-05T14:35:00+01:00",
        "last_attempt_at": "2026-02-05T14:35:01+01:00",
        "payload": {
          "event_id": "evt_abc123_42",
          "event": "slot.freed",
          "timestamp": "2026-02-05T14:35:00+01:00",
          "data": {
            "court_id": 15,
            "court_name": "Court A",
            "venue_name": "Abuja Tennis Club",
            "date": "2026-02-10",
            "start_time": "10:00",
            "end_time": "11:00"
          }
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 1,
      "last_page": 1
    }
  },
  "webhook_config": {
    "url": "https://partner.example.com/webhooks/spotts",
    "status": "active",
    "consecutive_failures": 0
  }
}
```

---

### 9. Test Webhook

Send a test webhook to verify your endpoint is configured correctly.

```
POST /v1/partner/webhooks/test
```

> **Prerequisite:** Webhook URL and secret must be configured by the SPOTTS admin team first.

#### Example Request

```bash
curl -X POST "https://YOUR_BACKEND_DOMAIN/api/v1/partner/webhooks/test" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

#### Success Response `200 OK`

```json
{
  "success": true,
  "message": "Test webhook sent successfully.",
  "status_code": 200,
  "response": "OK",
  "error": null
}
```

#### Failure Response `400 Bad Request`

```json
{
  "success": false,
  "message": "Test webhook failed.",
  "status_code": 500,
  "response": "Internal Server Error",
  "error": "HTTP 500"
}
```

#### Error Responses

| Status | Error Code | Condition |
|--------|------------|-----------|
| `400` | `NO_WEBHOOK_URL` | No webhook URL configured |
| `400` | `NO_WEBHOOK_SECRET` | No webhook secret configured |

---

## Webhooks

### Overview

When configured, SPOTTS sends webhook notifications to your specified URL for events related to availability changes at venues you have access to.

### Webhook Headers

```
Content-Type: application/json
X-Spotts-Event: slot.booked
X-Spotts-Signature: <hmac_sha256_signature>
X-Spotts-Timestamp: 1706140800
X-Spotts-Event-Id: evt_abc123
User-Agent: SPOTTS-Webhook/1.0
```

### Signature Verification

Signatures are generated using HMAC-SHA256 with the format: `{timestamp}.{json_payload}`

```javascript
const crypto = require('crypto');

function verifyWebhook(timestamp, payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${JSON.stringify(payload)}`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// In your webhook handler:
app.post('/webhooks/spotts', (req, res) => {
  const timestamp = req.headers['x-spotts-timestamp'];
  const signature = req.headers['x-spotts-signature'];

  const isValid = verifyWebhook(
    timestamp,
    req.body,
    signature,
    process.env.SPOTTS_WEBHOOK_SECRET
  );

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Process the webhook...
  res.status(200).send('OK');
});
```

```python
import hmac
import hashlib
import json

def verify_webhook(timestamp: str, payload: dict, signature: str, secret: str) -> bool:
    message = f"{timestamp}.{json.dumps(payload)}"
    expected = hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)
```

### Webhook Events

| Event | Description |
|-------|-------------|
| `slot.booked` | A slot was booked by a customer |
| `slot.freed` | A booking was cancelled, slot is now available |
| `slot.blocked` | A slot was blocked (by partner or venue staff) |
| `slot.unblocked` | A block was released, slot is now available |
| `webhook.test` | Test webhook (triggered via the test endpoint) |

### Webhook Payload Structure

```json
{
  "event_id": "evt_abc123_42",
  "event": "slot.freed",
  "timestamp": "2026-02-05T14:35:00+01:00",
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00"
  }
}
```

### Test Webhook Payload

```json
{
  "event_id": "evt_test123",
  "event": "webhook.test",
  "timestamp": "2026-02-05T14:35:00+01:00",
  "data": {
    "message": "This is a test webhook from SPOTTS",
    "partner_name": "Your Partner Name"
  }
}
```

### Retry Policy

Failed webhook deliveries are automatically retried. After consistent failures (default: 10), webhooks are automatically paused (circuit breaker pattern).

### Webhook Requirements

Your webhook endpoint must:

- Accept `POST` requests with `application/json` body
- Return a `2xx` status code within **10 seconds**
- Verify the `X-Spotts-Signature` header
- Be idempotent (handle duplicate deliveries gracefully using `event_id`)

---

## Error Codes Reference

Complete list of all error codes returned by the API:

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `MISSING_API_KEY` | 401 | No Authorization header provided |
| `INVALID_API_KEY` | 401 | API key doesn't match any partner |
| `API_KEY_REVOKED` | 401 | API key has been permanently revoked |
| `PARTNER_SUSPENDED` | 403 | Partner account is temporarily suspended |
| `VENUE_ACCESS_DENIED` | 403 | Partner doesn't have access to the requested venue |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests within the rate limit window |
| `COURT_NOT_FOUND` | 404 | Specified court ID does not exist |
| `BLOCK_NOT_FOUND` | 404 | Block reference not found or belongs to another partner |
| `SLOT_UNAVAILABLE` | 409 | Time slot is already booked or blocked |
| `DATE_IN_PAST` | 400 | Requested date is in the past |
| `DATE_TOO_FAR_AHEAD` | 400 | Date exceeds the partner's max advance days limit |
| `VENUE_CLOSED` | 400 | Venue is closed on this day |
| `OUTSIDE_OPERATING_HOURS` | 400 | Slot is outside operating hours |
| `INVALID_TIME_RANGE` | 400 | End time must be after start time |
| `BLACKOUT_DATE` | 400 | This date is unavailable |
| `INVALID_REASON` | 422 | Invalid release reason provided |
| `RESCHEDULE_FAILED` | 500 | Atomic reschedule operation failed |
| `NO_WEBHOOK_URL` | 400 | No webhook URL configured |
| `NO_WEBHOOK_SECRET` | 400 | No webhook secret configured |
| `VALIDATION_ERROR` | 422 | Request validation failed |

---

## Quick Start Guide

### Step 1: Get Your API Key

Contact the SPOTTS team to get onboarded as a partner. You'll receive:
- An API key in format `spk_...` (shown only once — save it securely)
- Confirmation of which venues you have access to

### Step 2: List Available Courts

```bash
curl -X GET "https://YOUR_BACKEND_DOMAIN/api/v1/partner/courts" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

### Step 3: Check Availability

```bash
curl -X GET "https://YOUR_BACKEND_DOMAIN/api/v1/partner/courts/15/availability?date=2026-02-10" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

### Step 4: Create a Block

```bash
curl -X POST "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks" \
  -H "Authorization: Bearer spk_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "court_id": 15,
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "partner_reference": "YOUR-BOOKING-ID-123"
  }'
```

### Step 5: Release Cancelled Blocks (REQUIRED)

> **⚠️ Always release blocks immediately when bookings are cancelled!**

```bash
# When a booking is cancelled (REQUIRED - frees the slot for others)
curl -X DELETE "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks/EXT-A1B2?reason=cancelled" \
  -H "Authorization: Bearer spk_your_api_key_here"

# When a booking is completed (OPTIONAL - for tracking only)
curl -X DELETE "https://YOUR_BACKEND_DOMAIN/api/v1/partner/blocks/EXT-A1B2?reason=completed" \
  -H "Authorization: Bearer spk_your_api_key_here"
```

---

## Integration Best Practices

### 1. Always Release Cancelled Blocks (Future Slots)

When a booking is **cancelled** on your platform and the slot is still in the future, immediately call the Release Block endpoint with `reason=cancelled`. This is critical for maintaining accurate availability across platforms.

Releasing blocks for `completed` or `no_show` bookings is optional — the time has already passed, so it doesn't affect availability. However, doing so keeps your block list clean and helps with reporting.

### 2. Use Idempotency Keys

Always include a unique `partner_reference` when creating blocks. If a network error occurs, you can safely retry the same request without creating duplicate blocks.

### 3. Cache Court Lists

Court lists rarely change. Cache the response from `GET /courts` and refresh every few hours rather than on every request.

### 4. Handle Rate Limits Gracefully

Check the `X-RateLimit-Remaining` header. When approaching zero, back off and wait before making more requests. If you receive a `429`, respect the `Retry-After` header.

### 5. Implement Webhook Handlers

Set up a webhook endpoint to receive real-time notifications about availability changes. This is more efficient than polling.

### 6. Verify Webhook Signatures

Always validate the `X-Spotts-Signature` header to ensure webhooks are genuinely from SPOTTS.

### 7. Handle Timezones Correctly

All times are in **West Africa Time (WAT / UTC+1)**. Dates are in `YYYY-MM-DD` format. Times are in `HH:MM` 24-hour format.

---

## Support

For API support, integration questions, or to report issues:

- **Email**: info@spottsapp.com

---

*Last updated: February 2026*
