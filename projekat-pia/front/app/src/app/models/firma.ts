import { Usluga } from "./usluga"

export class Firma{
    naziv:string=''
    adresa:string=''
    usluge:Usluga[]=[]
    lokacijaX:number=0
    lokacijaY:number=0
    kontakt:string=''
    odmor_od:String=''
    odmor_do:String=''
    ocena:number=0;
    brojOcena:number=0
    komentari:Array<string>=[]
}