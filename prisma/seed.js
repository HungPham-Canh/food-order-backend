import { db } from "../src/utils/db.server.js";
import fs from "fs";
import { SEED_DATA_PATH, ENCODING } from "../constants/seed.js";

async function seed() {
  let categories, jsonData;
  fs.readFile(SEED_DATA_PATH, ENCODING, async (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      jsonData = JSON.parse(data);
      categories = jsonData.categories;
      await db.category.create(categories[0]);
      await db.category.create(categories[1]);
    }
  });
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });