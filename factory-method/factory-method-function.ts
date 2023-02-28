import fs from "fs";

interface IFileReader {
    isJSONFile(file: string) : boolean;
    readText(file: string): string;
    readJSON(file: string): unknown;
}


const fileReader: IFileReader = {
	isJSONFile(file: string): boolean {
		return file.endsWith(".json");
	},

	readText(file: string): string {
		return fs.readFileSync(file, "utf-8").toString();
	},

	readJSON(file: string): unknown {
		return JSON.parse(fs.readFileSync(file, "utf-8").toString());
	},
};



function createDirectoryScrapper(reader: IFileReader) {
    
    return (dirPath: string) => {
        return fs.readdirSync(dirPath).reduce<Record<string, unknown>>((acc, file) => {
            if (reader.isJSONFile(file)) {
                acc[file] = reader.readJSON(`${dirPath}/${file}`);
            } else {
                acc[file] = reader.readText(`${dirPath}/${file}`);
            }

            return acc;
        }, {});
    }
}

const directoryScrapper = createDirectoryScrapper(fileReader);
const output = directoryScrapper("./data");
console.log(output);

//npx ts-node factory-method-function.ts