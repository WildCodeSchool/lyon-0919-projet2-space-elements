export class Enemy {
    types : string[] = ['fire','water','air','earth']
    type : string;
    posX : number;
    posY : number;
    life: boolean = true;
    width: number = 30;
    height:number = 30;

    
    constructor(type : string , posX : number, posY: number){
        this.type = type;
        this.posX = posX;
        this.posY = posY;
    }
}
