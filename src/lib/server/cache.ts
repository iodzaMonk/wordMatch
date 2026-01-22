import type { Word } from "$lib/types/word.type";
import * as fs from "fs";
export const wordCache: Map<string, Word[]> = new Map();

function initCache() {
    const levels = ['1', '2', '3', '4', '5', '6'];
    levels.forEach(lvl => {
        const words: Word[] = []; 
        const path = fs.readFileSync(`${process.cwd()}/src/lib/server/db/HSK/hsk${lvl}.csv`, 'utf-8');

        const textArray = path.split('\n');

        textArray.map((line) => {
            const wordArray = line.split(',');
            const word: Word = {character: wordArray[0], pinyin: wordArray[1], definition: wordArray[2]};
            words.push(word);
        })
        wordCache.set(lvl, words);
    })
}

initCache();