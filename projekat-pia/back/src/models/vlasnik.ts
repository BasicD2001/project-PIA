import mongoose from 'mongoose'

const Schema = mongoose.Schema;


let Vlasnik=new Schema({
    korisnicko_ime:{
        type:String
    },
    lozinka:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    pol:{
        type:String
    },
    adresa:{
        type:String
    },
    telefon:{
        type:String
    },
    slika:{
        type:String
    },
    kartica:{
        type:Number
    },
    status:{
        type:String
    },
    imejl:{
        type:String
    },
    zahtev:{
        type:String
    }
})

export default mongoose.model('Vlasnik', Vlasnik, 'vlasnik');