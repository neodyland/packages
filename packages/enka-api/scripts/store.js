const os = require("os");
const axios = require("axios");
const { writeFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const { exec } = require("child_process");
const { readFileSync } = require("fs");

const JSON_DIRECTORY = "data/store";
const TYPE_DIRECTORY = "src/types";

module.exports = () => {
  const getFileFromGithub = async (filePath) => {
    const res = await axios.get(
      `https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/${filePath}`
    );
    return res.data;
  };

  const files = [
    { name: "characters.json", toArray: true },
    { name: "affixes.json", toArray: true },
    { name: "costumes.json", toArray: true },
    { name: "loc.json", toArray: false },
    { name: "namecards.json", toArray: true },
  ];

  Promise.all(files.map((file) => getFileFromGithub(file.name))).then(
    (data) => {
      data.forEach((_data, index) => {
        const fileName = files[index].name;
        const filePath = `${JSON_DIRECTORY}/${fileName}`;

        if (files[index].toArray) {
          const array = [];
          for (const key in _data) {
            array.push({
              id: key,
              ..._data[key],
            });
          }
          _data = array;
        }

        writeFile(filePath, JSON.stringify(_data)).then(() => {
          const typeFilePath = `${TYPE_DIRECTORY}/${(
            fileName.charAt(0).toUpperCase() + fileName.slice(1)
          ).replace(".json", ".ts")}`;

          exec(`quicktype ${filePath} -o ${typeFilePath}  --just-types`, () => {
            if (files[index].toArray) {
              const file = readFileSync(typeFilePath, "utf8");
              const index = file.indexOf(";\n}") + 3;
              const newFile = (file.slice(0, index) + "[]" + file.slice(index))
                .replace("export interface", "export type")
                .replace("{", "= {");
              writeFile(typeFilePath, newFile);
            }

            if (existsSync("src/types/Loc.ts")) {
              const _file = readFileSync("src/types/Loc.ts", "utf8");
              writeFile("src/types/Loc.ts", _file.replace("LOC", "Loc"));
            }
          });
        });
      });
    }
  );

  writeFile(
    "./src/store.ts",
    `
/* Generated by scripts/gen.js */
  
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
  
${files
  .map(
    (file) =>
      `import { ${
        file.name.charAt(0).toUpperCase() +
        file.name.slice(1).replace(".json", "")
      } } from "./types/${
        file.name.charAt(0).toUpperCase() +
        file.name.slice(1).replace(".json", "")
      }";`
  )
  .join(os.EOL)}
  
class EnkaAPIStore {
${files
  .map(
    (file) =>
      `  public static ${file.name.replace(".json", "")} = this.readFile<${
        file.name.charAt(0).toUpperCase() +
        file.name.slice(1).replace(".json", "")
      }>(resolve(__dirname, "../data/store/${file.name}"));`
  )
  .join(os.EOL)}
  private static readFile<T>(filePath: string) {
    try {
      const file = readFileSync(filePath);
      if (file === undefined) {
        throw new Error(\`File \${filePath} is undefined\`);
      }
      return JSON.parse(file.toString()) as T;
      } catch (error) {
        throw error;
      }
    }
  }
  
  export default EnkaAPIStore;
  `
  );
};