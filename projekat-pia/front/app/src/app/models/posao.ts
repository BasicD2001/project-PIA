import { Usluga } from "./usluga"

export default class Posao{
    id:number=0;
    firma:string=''
    vlasnik:string=''
    dekorater:string=''
    datumPocetka:string=''
    datumKraja:string=''
    datumZakazivanja:string=''
    kvadraturaBaste:number=0
    dodatniZahtevi:string=''
    usluge:Usluga[]=[]
    status:string=''
    ocena:number=0
    komentar:string=''
    tip:string=''
    bazen:number=0
    zelenilo:number=0
    lezaljke:number=0
    fontana:number=1
    stolovi:number=0
    brojBazena:number=1
    brojFontana:number=1
    opis:string=''
    odrzavanje:string=''
    cekaMajstora:boolean=false
    slikaBaste:string=''
    izgledBaste:string=''
   







}