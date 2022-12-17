const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const List = require('./List');
const FileUser = require('./FileUser');
const User = require('./User');

class Manager{
    constructor(){
        this.items = new List();
        this.users = new List();
        this.fileUser = new FileUser();
    }

    populateItemsList(){
        const fileArray = this.fileUser.readFromFile('Items.txt');
        for(let i = 0; i < fileArray.length; i++){
            this.items.append(fileArray[i]);
        }
    }

    processUserInput(){
        readline.question('Who are you? ', name => {
            console.log('Hello ', name);
            readline.question('are you checking in or out?(in/out) ', check => {
                if(check == 'out'){
                    readline.question('what are you checking out? ', item => {
                        this.doProcessUserInput(name, check, item);
                        console.log('checkout success!')
                        readline.close();
                    })
                } else if(check == 'in'){
                    readline.question('what are you checking in? ', item => {
                        this.doProcessUserInput(name, check, item);
                        console.log('checkin success!')
                        readline.close();
                    })
                }
            }) 
        })
    }
    doProcessUserInput(name, out, item){
        if(out == 'out'){
            this.checkout(name, item);
        } else {
            this.checkin(name, item);
        }
        console.log('After transaction: \n');
        this.displayList(this.items);
        console.log('\nUser rentails: \n');
        this.displayList(this.users);
    }

    checkin(name, item){
        
        if(!this.items.contains(name)){
            console.log('greet folks', item);
            let newUser = new User(name, item);
            this.items.append(item);
            this.fileUser.writeToFile('Items.txt', this.items);
            this.users.append(newUser);
        } else {console.log('item already exists')}
     }

    checkout(name, item){
        if(this.items.contains(item)){
            let newUser = new User(name, item);
            this.users.append(newUser);
            this.items.remove(item);
        } else {
            console.log('item does not exit');
        }
    }

    displayList(list){
        if(list.length() == 1){
            if(list.getElement() instanceof User){
                console.log('name: ', list.getElement()['name']);
                console.log('item: ', list.getElement()['item']);
    
            } else {
                console.log(list.getElement());
            }
        } else {
            for(list.front(); list.currentPosition() < list.length()-1;list.next()){
                if(list.getElement() instanceof User){
                    console.log('name: ', list.getElement()['name']);
                    console.log('item: ', list.getElement()['item']);
        
                } else {
                    console.log(list.getElement());
                }
            }
        }
    }
}

module.exports = Manager;