
export class Ennemy {
    types : string[] = ['fire','water','air','earth']
    type : string;
    posX : number;
    posY : number;
    
    constructor(type : string , posX : number, posY: number){
        this.type = type;
        this.posX = posX;
        this.posY = posY;
    }
}
