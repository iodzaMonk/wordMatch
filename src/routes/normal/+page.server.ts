import { getQuizData } from "$lib/server/hsk";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {

    const {target, options} = getQuizData();
    return {
        word: target,
        options: options
    }
}