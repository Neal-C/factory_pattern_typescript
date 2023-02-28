import fs from "fs";

abstract class DirectorScrapperAbstract {
	constructor(public dirPath: string) {
		//shorthant initialization syntax via public keyword
	}

	scanFiles() {
		return fs.readdirSync(this.dirPath).reduce<Record<string, unknown>>((acc, file) => {
			if (this.isJSONFile(file)) {
				acc[file] = this.readJSON(`${this.dirPath}/${file}`);
			} else {
				acc[file] = this.readText(`${this.dirPath}/${file}`);
			}

			return acc;
		}, {});
	}

	abstract isJSONFile(file: string): boolean;
	abstract readJSON(file: string): unknown;
	abstract readText(file: string): string;
}

class FileReader extends DirectorScrapperAbstract {
	isJSONFile(file: string): boolean {
		return file.endsWith(".json");
	}

	readText(file: string): string {
		return fs.readFileSync(file, "utf-8").toString();
	}

	readJSON(file: string): unknown {
		return JSON.parse(fs.readFileSync(file, "utf-8").toString());
	}
}

const directoryScrapper = new FileReader("./data");
const output = directoryScrapper.scanFiles();
console.log(output);

//npx ts-node directory-scrapper-abstract.ts
