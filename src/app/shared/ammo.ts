
export class Ammo {
    posX: number;
    posY: number;
    width:number = 4;
    backgroundColor : string;

    constructor(backgroundColor, posX, posY){
        this.backgroundColor = backgroundColor;
        this.posX = posX ;
        this.posY = posY ;
    }
} 
