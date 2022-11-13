import { getRandomMovie } from "$lib/dbUtils";
import type { RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async () => {
  const { imdb_id, plot, year, director, actor } = await getRandomMovie()
  return new Response(JSON.stringify({ imdb_id, plot, year, director, actor }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
};
