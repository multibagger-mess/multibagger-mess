# SMS Gateway API

## Endpoint

POST /send-sms

### Request

```json
{
  "apiKey": "your-secret-key",
  "phoneNumber": "9876543210",
  "message": "Hello"
}
```

### Success Response

```json
{
  "success": true
}
```

### Failure Response

```json
{
  "success": false,
  "message": "Authentication failed."
}
```