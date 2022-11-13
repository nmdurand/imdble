import type { PageServerLoad } from './$types';
import { getMovieDataList, getRandomMovie } from "$lib/dbUtils";

export const load: PageServerLoad = async () => {
  const data = await getMovieDataList();
  let titles = data.map((movie) => movie.title)
  // Remove duplicates (movies with various versions)
  titles = [...new Set(titles)]
  const { imdb_id, plot, year, director, actor } = await getRandomMovie()
  return { titles, question: { imdb_id, plot, year, director, actor } };
};