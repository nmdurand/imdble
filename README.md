# IMDBle

IMDBle is a simple game based on the IMDb list of the 1000 best movies of all times. The goal is to guess the movie from the plot description.

## Installation

Install dependencies, create the database and seed it.

```bash
$ yarn install
$ npx prisma db push
$ npx prisma db seed
```

## Development

Run the project locally:
```bash
$ yarn run dev
```

## Deployment

Run the project in a Docker container (requires Docker and Docker Compose).
With Docker running:
```bash
$ docker compose up --build
```