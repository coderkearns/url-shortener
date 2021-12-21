# url-shortener

Shortens urls for later use.

## API

### Shorten a url

-   `GET /s?url=<url>` -> `{ status: 'ok', url: '<shortened url>' }`
-   `POST /s, { url: <ul> }` -> `{ status: 'ok', url: '<shortened url>' }`

### Expand a url

-   `GET /e/url>` -> `{ status: 'ok', url: '<original url>' }`

### Redirect to a url

-   `GET /r/<shortened url>` -> **redirect**
-   `GET /r?url=<shortened url>` -> **redirect**

### Get all urls

-   `GET /all` -> `{ status: 'ok', urls: [{ url: <original>, short: <shortened_url> }, ...] }`

### Index

-   `GET /` -> `{ status: 'ok', message: "Goto /s to shorten a url, /e to expand a url, /r to redirect to a url, /all to get all urls" }`
