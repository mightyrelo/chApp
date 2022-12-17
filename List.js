class List {
    constructor(){
        this.dataStore = [];
        this.listSize = 0;
        this.positionPtr = 0;
    }

    //mututators - append, remove, insert, clear
    append(element){
        this.dataStore[this.listSize] = element;
        ++this.listSize;
    }
    remove(element){
        let elPos = this.find(element);
        if(elPos > -1 ) {
            this.dataStore.splice(elPos, 1);
            --this.listSize;
            return true;
        } else {
            return false;
        }
    }
    insert(element, elementInfront) {
        let insertPos = this.find(elementInfront);
        if(insertPos > -1){
            this.dataStore.splice(insertPos+1,0,element);
            ++this.listSize;
            return true;
        } else {
            return false;
        }
    }
    clear(){
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.positionPtr = 0;
    }
    //accessors - front, end, next, previous, moveTo
    front(){
        this.positionPtr = 0;
    }
    end(){
        this.positionPtr = this.length()-1;
    }

    next(){
        if(this.currentPosition() < this.length()-1) {
            this.positionPtr++;
        }
    }

    previous(){
        if(this.currentPosition() > 0){
            this.positionPtr--;
        }
    }

    moveTo(pos){
        if(pos > 0 && pos < (this.length()-1)){
            this.positionPtr = pos;
        }
    }

    //queryies - find, getElement, length, contains, currentPosition, toString
    find(element){
        for(let i = 0; i < this.dataStore.length; i++){
            if(this.dataStore[i] == element){
                return i;
            }
        }
        return -1;
    }
    length(){
        return this.listSize;
    }
    currentPosition(){
        return this.positionPtr;
    }
    getElement(){
        this.dataStore[this.positionPtr];
    }
    contains(element){
        if(this.find(element) > -1){
            return true;
        } else {
            return false;
        }
    }
    toString(){
        return this.dataStore;
    }
}

module.exports = List;