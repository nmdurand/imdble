import axios from 'axios'
import * as cheerio from 'cheerio'
import { PrismaClient, type Movie } from '@prisma/client'

const IMDB_TOP1000_PATH = 'https://www.imdb.com/search/title/?title_type=feature&groups=top_1000'

const YEAR_REGEX = /\d{4}/
const IMDB_ID_REGEX = /\/title\/([a-z0-9]*)\//

interface movieDetails {
  title: string
  imdb_id: string
  plot: string
  year: number
  director: string
  actor: string
}

const scrapeMovieData = async () => {
  console.log('Scraping movie data.')
  try {
    const data: movieDetails[] = []
    for (let i = 0; i < 20; i++) {
      const url = IMDB_TOP1000_PATH + `&start=${i * 50 + 1}`
      console.log('Navigating to url:', url)

      const options = { headers: { 'Accept-Language': 'en' } }
      const response = await axios.get(url, options)
      const $ = cheerio.load(response.data)
      $('.lister-item-content').each((i, element) => {
        const title = $(element).find('.lister-item-header a').text()
        const imdb_id = $(element).find('.lister-item-header a').attr('href')?.match(IMDB_ID_REGEX)?.[1] || ''
        const plot = $(element).find('.ratings-bar + .text-muted').text().trim()
        const year_str = $(element).find('.lister-item-year').text().match(YEAR_REGEX)?.[0]
        const director = $(element).find('.ratings-bar + .text-muted  + p > a').first().text()
        const actor = $(element).find('.ratings-bar + .text-muted + p > span + a').first().text()

        if (year_str === undefined) {
          throw new Error(`No year found for movie: ${title}`)
        }
        const year = parseInt(year_str)

        data.push({
          title,
          imdb_id,
          plot,
          year,
          director,
          actor,
        })
      }
      )
    }
    return data
  } catch (err) {
    console.error('Error scraping movie data:', err)
    throw err
  }
}

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
