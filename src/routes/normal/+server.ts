import { json } from "@sveltejs/kit";
import { getRandomWord } from "../../lib/server/hsk.ts";

export function GET() {
    const word = getRandomWord(); 
    return json(word);
}