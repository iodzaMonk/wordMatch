import type { Word } from '$lib/types/word.type';
import { inArray } from 'drizzle-orm';
import { db } from './db/db';
import { word } from './db/schema';

export async function getQuizData(lvl?: string): Promise<{target: Word, options: Word[]}> {
    const [target, op1, op2, op3] = await Promise.all([
        getRandomWord(lvl),
        getRandomWord(lvl),
        getRandomWord(lvl),
        getRandomWord(lvl)
    ]);

    return {target, options: [op1, op2, op3]}
}
export async function getRandomWord(level?: string | string[]): Promise<Word> {


    
    let query = db.select().from(word).$dynamic();
    
    // Only filter if level is provided
    if (level) {
        // Ensure no undefined values in array for typescript check
        // Also normalize levels (e.g. "1" -> "HSK1")
        const safeLevels = (Array.isArray(level) ? level : [level])
            .filter((l): l is string => l !== undefined)
            .map(l => {
                if (/^\d+$/.test(l)) return `HSK${l}`;
                return l;
            });
            
        if (safeLevels.length > 0) {
             query = query.where(inArray(word.lvl, safeLevels));
        }
    }

    const pool = await query;

    if (!pool.length) {
        console.error(`No words found for level: ${level}`);
        throw new Error(`No words found in DB for level ${level || 'all'}`);
    }

    const random = pool[Math.floor(Math.random() * pool.length)];
    if (!random) throw new Error("Random word is undefined!");
    
    return random;
}