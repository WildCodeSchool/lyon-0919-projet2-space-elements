import { Ship } from "./ship"

export const SHIPS: Ship[] = 
[
    {
        id: 1,
        url: "../assets/img/ship_air.png",
        posX: 880,
        posY: 133,
        HP: 10,
        size: 100,
        width : 40,
        height :  60,
        type : {},
        shipSkin : [
            ['/assets/img/ship_fire.png', '/assets/img/ship_fire1.png'],
            ['/assets/img/ship_water.png', '/assets/img/ship_water1.png'],
            ['/assets/img/ship_air.png', '/assets/img/ship_air1.png'],
            ['/assets/img/ship_earth.png', '/assets/img/ship_earth1.png']
          ]
    },
    {
        id: 2,
        url: "../assets/img/ship2_fire.png",
        posX: 880,
        posY: 133,
        HP: 10,
        size: 100,
        width : 40,
        height :  60,
        type : {},
        shipSkin : [
            ['/assets/img/ship_fire.png', '/assets/img/ship2_fire1.png'],
            ['/assets/img/ship_water.png', '/assets/img/ship2_water1.png'],
            ['/assets/img/ship_air.png', '/assets/img/ship2_air1.png'],
            ['/assets/img/ship_earth.png', '/assets/img/ship2_earth1.png']
          ]
    }
]