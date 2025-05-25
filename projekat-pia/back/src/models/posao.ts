import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Posao=new Schema({
    id:{
        type:Number
    },
    firma:{
        type:String
    },
    vlasnik:{
        type:String
    },
    dekorater:{
        type:String
    },
    datumPocetka:{
        type:String
    },
    datumKraja:{
        type:String
    },
    datumZakazivanja:{
        type:String
    },
    kvadraturaBaste:{
        type:String
    },
    dodatniZahtevi:{
        type:String
    },
    usluge:{
        type:Array
    },
    status:{
        type:String
    },
    ocena:{
        type:Number
    },
    komentar:{
        type:String
    },
    tip:{
        type:String
    },
    bazen:{
        type:Number
    },
    zelenilo:{
        type:Number
    },
    lezaljke:{
        type:Number
    },
    fontana:{
        type:Number
    },
    stolovi:{
        type:Number
    },
    brojBazena:{
        type:Number
    },
    brojFontana:{
        type:Number
    },
    opis:{
        type:String
    },
    odrzavanje:{
        type:String
    },
    cekaMajstora:{
        type:Boolean
    },
    slikaBaste:{
        type:String
    },
    izgledBaste:{
        type:String
    }
    
})

export default mongoose.model('Posao', Posao, 'posao');