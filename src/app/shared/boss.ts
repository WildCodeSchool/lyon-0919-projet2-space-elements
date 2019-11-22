export class Boss {
    type : Object;
    posX : number;
    posY : number;
    HP : number = 100;
    life: boolean = true;
    width: number = 500;
    height:number = 307;
    pic : string;
    
    constructor(posX : number, posY: number, pic: string, ){
        this.posX = posX;
        this.posY = posY;
        this.pic = pic;
    }
}