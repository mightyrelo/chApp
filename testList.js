const List = require('./List');

const names = ['Katlego', 'Enoch', 'Gagoopane', ''];
let namesList = new List();

for(let i = 0; i < names.length; i++){
    namesList.append(names[i]);
}

namesList.insert('Mightyrelo', 'Enoch');
namesList.moveTo(1);
console.log(namesList.getElement());
