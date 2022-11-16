import type { RequestHandler } from "@sveltejs/kit";
import { getMovieData } from "$lib/repository";


export const POST: RequestHandler = async ({ request }) => {
  const { imdb_id, answer } = await request.json()
  const movie = await getMovieData(imdb_id)
  if (movie === null) {
    // Handle unknown imdb_id error
    return Response.error()
  } else {
    const isCorrect = movie.title.toLowerCase() === answer?.toLowerCase()
    return new Response(JSON.stringify({ imdb_id, answer, isCorrect }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
};
