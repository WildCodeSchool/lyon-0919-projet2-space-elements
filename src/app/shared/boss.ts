export class Boss {
    type : Object;
    posX : number;
    posY : number;
    life: boolean = true;
    width: number = 300;
    height:number = 60;
    backgroundColor: string;
    
    constructor(posX : number, posY: number, backgroundColor: string){
        this.posX = posX;
        this.posY = posY;
        this.backgroundColor = backgroundColor;
    }
}