import type { Word } from '$lib/types/word.type';
import { wordCache } from './cache';

export function getQuizData(lvl?: string): {target: Word, options: Word[]} {
    const target = getRandomWord(lvl); 
    const op1 = getRandomWord(lvl);
    const op2 = getRandomWord(lvl);
    const op3 = getRandomWord(lvl);

    return {target, options: [op1, op2, op3]}
}
export function getRandomWord(lvl?: string | string[]): Word {

    const targetLevels = Array.isArray(lvl) ? lvl : [lvl];

    const pool = targetLevels.flatMap(lvl => wordCache.get(lvl as string) || []);

    return pool[Math.floor(Math.random() * pool.length)];
}