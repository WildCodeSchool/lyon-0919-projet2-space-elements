export class Enemy {
    type : Object;
    posX : number;
    posY : number;
    life: boolean = true;
    width: number = 60;
    height:number = 40;

    
    constructor(type : Object , posX : number, posY: number){
        this.type = type;
        this.posX = posX;
        this.posY = posY;
    }
}
