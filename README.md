# Mock API For Token Pagination Testing

A NodeJS/Express API for mocking a token pagination.

* API key authentication
* Base64 + HMAC signed pagination tokens
* Support for nextPageToken and previousPageToken
* Response metadata: total, currentOffset, currentPage, pageSize
* Default page size loaded from .env

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