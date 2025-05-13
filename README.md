# Mock API For Token Pagination Testing

A NodeJS/Express API for mocking a token pagination.

* API key authentication
* Base64 + HMAC signed pagination tokens
* Support for nextPageToken and previousPageToken
* Response metadata: total, currentOffset, currentPage, pageSize
* Default page size loaded from .env

## To Run

* Clone Repo
* Run `npm init`
* Run `npm start`
* Make calls to the API

## Curl Commands

```bash
curl -X GET "http://localhost:3000/items" \
-H "x-api-key: supersecretapikey"
```

```bash
curl -X GET "http://localhost:3000/items?pageSize=10" \
  -H "x-api-key: supersecretapikey"
```

```bash
curl -X GET "http://localhost:3000/items?pageToken=MTAuYTk3MGM4MmY2YjYwYmQzOGY1MzdiZWYwMjU5ODA0ZTFkZDE5NzhjMDRhY2EyMWYzYzRiNzY5ZWU4NDgzZTQ3Zg==" \
  -H "x-api-key: supersecretapikey"
```

```bash
curl -X GET "http://localhost:3000/items?pageSize=10&pageToken=MTAuYTk3MGM4MmY2YjYwYmQzOGY1MzdiZWYwMjU5ODA0ZTFkZDE5NzhjMDRhY2EyMWYzYzRiNzY5ZWU4NDgzZTQ3Zg==" \
  -H "x-api-key: supersecretapikey"
```

## Sample Response

```json
{
  "total": 1000,
  "currentOffset": 10,
  "currentPage": 2,
  "pageSize": 10,
  "nextPageToken": "MjAuN2E1MTk1YjViMDM3NmYwMThiODc3YWVlMjJlMmFlYjc0YTk2ZGQzNGIzMzJkMjEyMDdjNzc5NjY3ZTMyYmJjNQ==",
  "previousPageToken": "MC43NzczZGZmM2UwOWQ4NTc4M2IyNWExMzNmMWVmZWQ5OTc3NDUwYmM0ZjYwNzdlYTQ5MjQ4ZjhjOTc2ZTBiZjAy",
  "items": [
    {
      "id": 11,
      "name": "Item 11"
    },
    {
      "id": 12,
      "name": "Item 12"
    },
    {
      "id": 13,
      "name": "Item 13"
    },
    {
      "id": 14,
      "name": "Item 14"
    },
    {
      "id": 15,
      "name": "Item 15"
    },
    {
      "id": 16,
      "name": "Item 16"
    },
    {
      "id": 17,
      "name": "Item 17"
    },
    {
      "id": 18,
      "name": "Item 18"
    },
    {
      "id": 19,
      "name": "Item 19"
    },
    {
      "id": 20,
      "name": "Item 20"
    }
  ]
}
```