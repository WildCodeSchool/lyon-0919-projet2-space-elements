export class Boss {
    type : Object;
    posX : number;
    posY : number;
    HP : number = 100;
    life: boolean = true;
    width: number = 300;
    height:number = 60;
    backgroundColor: string;
    
    constructor(posX : number, posY: number, backgroundColor: string, HP: number){
        this.posX = posX;
        this.posY = posY;
        this.backgroundColor = backgroundColor;
        this.HP = HP;
    }
}