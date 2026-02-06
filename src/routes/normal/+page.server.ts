import { db } from "$lib/server/db/db";
import { word } from "$lib/server/db/schema";
import { getQuizData } from "$lib/server/hsk";
import { initDb } from "$lib/server/initDb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {

    const lvl = url.searchParams.get('lvl');
    const database = await db.select().from(word).limit(1);
    console.log(`DB check: found ${database.length} words`);
    if (database.length === 0) {
        console.log("DB is empty, running initDb...");
        await initDb();
    }
    const { target, options } = await getQuizData(lvl as string);
    return {
        word: target,
        options: options
    }
}