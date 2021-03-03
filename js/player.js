export default function Player(name, sign){
    this.name= name;
    this.sign= sign;
    this.score= 0;
}

Player.prototype.scoreAdd= function(){
    this.score ++
}

Player.prototype.reset= function(){
    this.score=0;
    this.name= ""
}

Player.prototype.hasWon= function(){
    return `${this.name} won`
}

Player.prototype.hasWonTheGame= function(){
    return `Abd the winner is ... ${this.name}`
}