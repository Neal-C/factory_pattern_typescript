import fs from "fs";

interface IFileReader {
	isJSONFile(file: string): boolean;
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

function directoryScrapper(path: string, reader: IFileReader) {
	return fs.readdirSync(path).reduce<Record<string, unknown>>((acc, file) => {
		if (reader.isJSONFile(file)) {
			acc[file] = reader.readJSON(`${path}/${file}`);
		} else {
			acc[file] = reader.readText(`${path}/${file}`);
		}

		return acc;
	}, {});
}

const output = directoryScrapper("./data", fileReader);
console.log(output);

//npx ts-node directory-scrapper-function.ts
