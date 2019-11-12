
export class Ammo {
    posX: number;
    posY: number;
    width:number = 4;
    type: Object;


    constructor(type : Object, posX : number, posY : number){
        this.type = type;
        this.posX = posX ;
        this.posY = posY ;
    }
} 
