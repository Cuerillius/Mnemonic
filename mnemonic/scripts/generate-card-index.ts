const fs = require("fs");
const path = require("path");

const cardsDir = path.join(__dirname, "../cards");
const outputFile = path.join(cardsDir, "index.ts");

const imageExtensions = [".png", ".jpg", ".jpeg", ".svg"];

const imageFiles = fs
  .readdirSync(cardsDir)
  .filter((file) => imageExtensions.some((ext) => file.endsWith(ext)));

const importStatements = imageFiles
  .map((file, index) => `import image${index} from "./${file}";`)
  .join("\n");

const cardObjects = imageFiles
  .map((file, index) => `{ name: "${file}", image: image${index} }`)
  .join(",\n  ");

const fileContent = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n
import { type CardProps } from "../src/FlashcardHelper";

${importStatements}

export const allCards: Array<CardProps> = [
  ${cardObjects}
];
`;

fs.writeFileSync(outputFile, fileContent, "utf8");

console.log(`✅ Successfully generated ${outputFile}`);
