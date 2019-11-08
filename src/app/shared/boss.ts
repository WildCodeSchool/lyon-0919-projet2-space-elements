export class Boss {
    type : Object;
    posX : number;
    posY : number;
    life: boolean = true;
    width: number;
    height:number;
    backgroundColor: string;
    
    constructor(posX : number, posY: number, backgroundColor: string){
        this.posX = posX;
        this.posY = posY;
        this.backgroundColor = backgroundColor;
    }
}