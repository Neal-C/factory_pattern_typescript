import fs from "fs";


interface IFileReader {
    isJSONFile(file: string) : boolean;
    readText(file: string): string;
    readJSON(file: string): unknown;
}


class FileReader implements IFileReader {
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

class DirectoryScrapper {
    constructor(public dirPath: string, public reader: IFileReader){
        //shorthant initialization syntax via public keyword
    };

    scanFiles(){
        return fs.readdirSync(this.dirPath).reduce<Record<string, unknown>>((acc, file) => {
            if(this.reader.isJSONFile(file)){
                acc[file] = this.reader.readJSON(`${this.dirPath}/${file}`)
            } else {
                acc[file] = this.reader.readText(`${this.dirPath}/${file}`);
            }

            return acc;
        }, {});
    }
}

const fileReader = new FileReader();
const directoryScrapper = new DirectoryScrapper("./data", fileReader);
const output = directoryScrapper.scanFiles();
console.log(output);
//npx ts-node directory-scrapper-class.ts