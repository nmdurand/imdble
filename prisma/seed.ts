import { scrapeMovieData } from '../src/lib/movieDataProvider.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const main = async () => {
    const movies = await prisma.movie.findMany()
    if (movies.length < 1000) {
        console.log('Seeding movie data...')
        try {
            const data = await scrapeMovieData()
            if (data !== undefined) {
                for (const movie of data) {
                    const { title, imdb_id, plot, year, director, actor } = movie
                    try {
                        await prisma.movie.upsert({
                            where: { imdb_id },
                            update: {},
                            create: { title, imdb_id, plot, year, director, actor, },
                        })
                    } catch (err) {
                        console.error('Error creating movie data entry in db:', err)
                        throw err
                    }
                }
            } else {
                throw new Error('No data returned from scrapeMovieData.')
            }
        } catch (err) {
            console.error('Error updating movie data:', err)
            throw err
        }
    } else {
        console.log('Movie data already seeded.')
    }
}

await main()
await prisma.$disconnect()