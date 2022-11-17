import type { RequestHandler } from "@sveltejs/kit";
import { getMovieData } from "$lib/repository";


export const POST: RequestHandler = async ({ request }) => {
  const { imdb_id, answer, currentGuessIndex } = await request.json()
  const movie = await getMovieData(imdb_id)
  if (movie === null) {
    // Handle unknown imdb_id error
    return Response.error()
  } else {
    const isCorrect = movie.title.toLowerCase() === answer?.toLowerCase()
    const res = {
      isCorrect,
      answer: (isCorrect || currentGuessIndex === 3) ? movie.title : undefined
    }
    return new Response(JSON.stringify(res), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
};
