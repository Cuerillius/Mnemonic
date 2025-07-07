// scripts/generate-card-index.js

const fs = require("fs");
const path = require("path");

const cardsDir = path.join(__dirname, "../cards"); // Path to your cards directory
const outputFile = path.join(cardsDir, "index.ts"); // The file we'll generate

const imageExtensions = [".png", ".jpg", ".jpeg", ".svg"];

// 1. Find all image files in the directory
const imageFiles = fs
  .readdirSync(cardsDir)
  .filter((file) => imageExtensions.some((ext) => file.endsWith(ext)));

// 2. Generate the import statements
const importStatements = imageFiles
  .map((file, index) => `import image${index} from "./${file}";`)
  .join("\n");

// 3. Generate the array of card objects
const cardObjects = imageFiles
  .map((file, index) => `{ name: "${file}", image: image${index} }`)
  .join(",\n  ");

// 4. Assemble the final file content
const fileContent = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n
import { type CardProps } from "../src/FlashcardHelper";

${importStatements}

export const allCards: Array<CardProps> = [
  ${cardObjects}
];
`;

// 5. Write the content to the output file
fs.writeFileSync(outputFile, fileContent, "utf8");

console.log(`✅ Successfully generated ${outputFile}`);
