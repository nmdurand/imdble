import type { PageServerLoad } from './$types';
import { getMovieTitleList } from "$lib/repository";

export const load: PageServerLoad = async () => {
  const titles = await getMovieTitleList();
  return { titles };
};