import axios from 'axios'
import * as cheerio from 'cheerio'

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

export const scrapeMovieData = async () => {
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
