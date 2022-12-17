const fs = require('fs');
const {readFileSync} = require('fs');
const List = require('./List');

class FileUser {
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

    readFromFile(path) {
        let rawFileString =  readFileSync(path, 'utf-8');
        let rawArray = rawFileString.split('\n');
        let arrayWithoutNumbers = rawArray.map(this.removeExtras);
        let cleanArray = arrayWithoutNumbers.map(this.removeCarriage);
        return cleanArray;
    }

    writeToFile(path, list) {
        var file = fs.createWriteStream(path);
        file.on('error', function(err) { /* error handling */ });
        let line = 1;
        for(list.front(); list.currentPosition() < list.length() -1; list.next()){
            file.write(line + '. ' + list.getElement() + '\n');
            line++;
        }
        file.end();
    }
} 


const list = new List();
list.append('Hello');
list.append('My');
list.append('name');
list.append('is');
list.append('Katlego');
list.append('');

let fu = new FileUser();
fu.writeToFile('Items.txt', list);



module.exports = FileUser;

