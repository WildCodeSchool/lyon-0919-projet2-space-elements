export class Enemy {
    type : Object;
    posX : number;
    posY : number;
    life: boolean = true;
    HP : number = 3;
    width: number = 60;
    height:number = 40;
    pic : string;

    
    constructor(type : Object , posX : number, posY: number){
        this.type = type;
        this.posX = posX;
        this.posY = posY;
    }
}
