export class Obstacle {
    posX : number;
    posY : number;
    width: number = 180;
    height:number = 180;
    pic : String;

    constructor(posX: number, posY: number)
    {
        this.posX = posX;
        this.posY = posY;
    }
}
