import XY from "./xy"
import ZaKrug from "./zaKrug"
import ZaKvadrate from "./zaKvadrate"

export default class IzgledBaste{
    tip:string=''
    zelenilo:Array<ZaKvadrate>=[]
    bazen:Array<ZaKvadrate>=[]
    fontana:Array<ZaKrug>=[]
    sto:Array<ZaKrug>=[]
    stolice:Array<ZaKvadrate>=[]
    lezaljke:Array<ZaKvadrate>=[]
}