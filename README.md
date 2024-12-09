# URL-shortener
A simple URL Shortener application that enables users to create shortened URLs, manage expiration dates, and redirect to original URLs. This project includes both a Django backend and a React frontend.

## Features
- ***Shorten URLs***: Transform long URLs into compact, user-friendly links.
- ***Custom Alias Support***: Allow users to create personalized short URLs instead of system-generated ones.
- ***Expiration Date***: Users can set custom expiration dates for their short URLs, or default expiration is applied.
- ***Redirection***: Redirect users from short URLs to their original long URLs seamlessly.
- ***Error Handling***: Provide informative messages for: Expired URLs, Non-existent or invalid short URLs

## Technology Stack

### Backend: Django
- Django REST Framework
- Gunicorn for production

### Database: PostgreSQL

### Frontend: React
- Tailwind CSS for styling
- React Router for navigation
- React Query for API data fetching
- Vite for fast builds and development

## API Endpoints

### Create Short URL: POST /api/v1/urls/

```bash
    Request:
    {
        "long_url": "https://example.com",
        "short_url_id": "custom-alias", // Optional
        "expiration_date": "YYYY-MM-DD" // Optional
    }
```

### Redirect to Long URL: GET /api/v1/urls/<short_url_id>/
```bash
	Response:
	•	302 Redirect (Success)
	•	410 Gone (Expired)
	•	404 Not Found (Invalid)
```
## Website
https://url-shortener-production-5e17.up.railway.app/

## Contact

- **Author**: NGUYEN Le Diem Quynh
- **Email**: lnguye220903@gmail.com
- **GitHub**: nldq092203
