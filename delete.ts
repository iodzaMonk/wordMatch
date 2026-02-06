import { db } from "./src/lib/server/db/db.ts";
import { word } from "./src/lib/server/db/schema.ts";

await db.delete(word);