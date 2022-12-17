const fs = require('fs');
const {readFileSync} = require('fs');

class FileReader {
    constructor(){
        this.fileData = [];
    }

    removeExtras(line){
        let spPos = line.indexOf(' ');
        if(spPos > -1){
            return line.substring(spPos+1);
        }
        return line;
    }

    removeCarriage(line){
        let crPos = line.indexOf('\r');
        if(crPos > -1){
            return line.substring(0,crPos);
        }
        return line;
    }

    readFromFile(file) {
        let rawFileString =  readFileSync(file, 'utf-8');
        let rawArray = rawFileString.split('\n');
        let arrayWithoutNumbers = rawArray.map(this.removeExtras);
        let cleanArray = arrayWithoutNumbers.map(this.removeCarriage);
        return cleanArray;
    }
} 

let fr = new FileReader();
console.log(fr.readFromFile('Items.txt'));


module.exports = FileReader;

