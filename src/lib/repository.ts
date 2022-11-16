import { scrapeMovieData } from './movieDataProvider'
import { PrismaClient, type Movie } from '@prisma/client'

export const updateMovieData = async () => {
  console.log('Updating movie data.')
  try {
    const prisma = new PrismaClient()
    const data = await scrapeMovieData()
    if (data !== undefined) {
      for (const movie of data) {
        const { title, imdb_id, plot, year, director, actor } = movie
        await prisma.movie.create({
          data: { title, imdb_id, plot, year, director, actor, }
        })
      }
    } else {
      throw new Error('No data returned from scrapeMovieData.')
    }
    await prisma.$disconnect()
  } catch (err) {
    console.error('Error updating movie data:', err)
    throw err
  }
}

export const getRandomMovie = async (): Promise<Movie> => {
  const prisma = new PrismaClient()
  const result: Movie[] = await prisma.$queryRawUnsafe(
    `SELECT * FROM "Movie" ORDER BY RANDOM() LIMIT 1;`,
  )
  if (result.length === 0) {
    await updateMovieData()
    await prisma.$disconnect()
    return getRandomMovie()
  }
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