import { getQuizData } from "$lib/server/hsk";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {

    const lvl = url.searchParams.get('lvl');
    const {target, options} = getQuizData(lvl as string);
    return {
        word: target,
        options: options
    }
}