
import { db } from "$lib/server/db/db";
import { word } from "$lib/server/db/schema";
import * as fs from "fs";

export async function initDb() {
    const levels = ['1', '2', '3', '4', '5', '6'];
    console.log("Starting DB initialization...");
    
    for (const lvl of levels) {
        try {
            const filePath = `${process.cwd()}/src/lib/server/db/HSK/hsk${lvl}.csv`;
            if (!fs.existsSync(filePath)) {
                console.warn(`File not found: ${filePath}`);
                continue;
            }
            
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const lines = fileContent.split('\n').filter(line => line.trim() !== '');

            const chunkSize = 100;
            const chunks = [];
            let currentChunk = [];

            for (const line of lines) {
                const parts = line.split(',');
                if (parts.length < 3) continue;

                // Simple parsing: first 2 commas separate fields, rest is definition
                const character = parts[0];
                const pinyin = parts[1];
                const definition = parts.slice(2).join(',');

                currentChunk.push({
                    character,
                    pinyin,
                    definition,
                    lvl: `HSK${lvl}` // Store as HSK1, HSK2 etc
                });

                if (currentChunk.length >= chunkSize) {
                    chunks.push(currentChunk);
                    currentChunk = [];
                }
            }
            if (currentChunk.length > 0) chunks.push(currentChunk);

            console.log(`Inserting HSK${lvl}: ${lines.length} words...`);
            for (const chunk of chunks) {
                await db.insert(word).values(chunk).onConflictDoNothing();
            }
        } catch (e) {
            console.error(`Error initializing HSK${lvl}:`, e);
        }
    }
    console.log("DB Initialization complete.");
}
