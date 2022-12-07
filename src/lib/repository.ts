import { PrismaClient, type Movie } from '@prisma/client'

export const getRandomMovie = async (): Promise<Movie> => {
  const prisma = new PrismaClient()
  const result: Movie[] = await prisma.$queryRawUnsafe(
    `SELECT * FROM "Movie" ORDER BY RANDOM() LIMIT 1;`,
  )
  await prisma.$disconnect()
  return result[0]
}

export const getMovieData = async (imdb_id: string): Promise<Movie | null> => {
  const prisma = new PrismaClient()
  if (imdb_id === undefined) {
    await prisma.$disconnect()
    return null
  }
  const result: Movie | null = await prisma.movie.findUnique({
    where: {
      imdb_id,
    },
  })
  await prisma.$disconnect()
  return result
}

export const getMovieDataList = async (): Promise<Movie[]> => {
  const prisma = new PrismaClient()
  const result: Movie[] = await prisma.movie.findMany()
  await prisma.$disconnect()
  return result
}

export const getMovieTitleList = async (): Promise<string[]> => {
  const prisma = new PrismaClient()
  const result: string[] = (await prisma.movie.findMany(
    { select: { title: true } }
  )).map((movie) => movie.title)
  // Remove duplicates (movies with various versions)
  const titles: string[] = [...new Set(result)]
  await prisma.$disconnect()
  return titles
}