# IMDBle

IMDBle is a simple game based on the IMDb list of the 1000 best movies of all times. The goal is to guess the movie from the plot description.

## Installation
```bash
$ yarn install
$ npx prisma db push
$ npx prisma db seed
```

## Usage
```bash
$ yarn run dev
```

On the first run, the game will download the list of movies and store it in a local file. This may take a while.