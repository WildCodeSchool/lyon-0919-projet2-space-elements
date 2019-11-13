export class Bonus {
    type: number;
    posX : number;
    posY : number;
    width: number = 100;
    height:number = 100;
    pic: String = "/assets/img/faqs.png";

    constructor(posX: number, posY: number)
    {
        this.posX = posX;
        this.posY = posY;
    }
}
