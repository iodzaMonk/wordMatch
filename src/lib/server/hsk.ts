import * as fs from 'fs';
import type { Word } from '$lib/types/word.type';

export function getQuizData(): {target: Word, options: Word[]} {

    const target = getRandomWord(); 
    const op1 = getRandomWord();
    const op2 = getRandomWord();
    const op3 = getRandomWord();

    return {target, options: [op1, op2, op3]}
}
export function getRandomWord(): Word {


    process.cwd(); // returns current DIR

    const text = fs.readFileSync(`${process.cwd()}/src/lib/server/db/HSK/hsk1.csv`, 'utf-8');
    const textArray = text.split('\n');

    const line = textArray[Math.ceil(Math.random() * textArray.length)]; 

    const splitArray = line.split(',');
    return {character: splitArray[0], pinyin: splitArray[1], definition: splitArray[2]}
}