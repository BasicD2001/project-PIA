import mongoose from 'mongoose'

const Schema = mongoose.Schema;


let Firma=new Schema({
    naziv:{
        type:String
    },
    adresa:{
        type:String
    },
    usluge:{
        type:Array
    },
    lokacijaX:{
        type:Number
    },
    lokacijaY:{
        type:Number
    },
    kontakt:{
        type:String
    },
    odmor_od:{
        type:String
    },
    odmor_do:{
        type:String
    },
    ocena:{
        type:Number
    },
    brojOcena:{
        type:Number
    },
    komentari:{
        type:Array
    }
    
})

export default mongoose.model('Firma', Firma, 'firma');