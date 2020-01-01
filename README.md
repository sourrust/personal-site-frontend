# Personal Site Front-End

The presentation layer for my personal site [jeremy-hull.com][1], and
the application layer is [located here][2].

### Using Docker

I only included the `Dockerfile` and for this to run you need the
backend for development. Here is an example, using docker compose, to
run the application:

```yml
version: "3"
services:
    redis:
        image: redis:4.0.14-alpine
        container_name: personal-site.redis
        ports:
            - 3306:3306
    backend:
        build: ./backend/
        container_name: personal-site.backend
        environment:
            - DATABASE_NAME=personal_site
            - DATABASE_PORT=3306
            - DATABASE_PASSWORD=database_password
            - REDIS_HOST=personal-site.redis
            - REDIS_DB_INDEX=0
            - REDIS_PASSWORD=redis_password
        depends_on:
            - redis
        ports:
            - 1337:1337
        volumes:
            - ./backend:/opt/backend
            - /opt/backend/node_modules
    frontend:
        build: ./frontend/
        container_name: personal-site.frontend
        environment:
            - GOOGLE_ANALYTICS_ID=google_analyitcs_id
            - GMAIL_USERNAME=gmail_username
            - GMAIL_PASSWORD=gmail_password
            - EMAIL_USERNAME=email_address
            - MACHINE_ENV=docker
        ports:
            - 3000:3000
        volumes:
            - ./frontend:/opt/frontend
            - /opt/frontend/node_modules
```

[1]: https://jeremy-hull.com/
[2]: https://github.com/sourrust/personal-site-backend
