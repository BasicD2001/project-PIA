import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Odrzavanje=new Schema({
    idPosao: {
        type: Number
    },
    datumPocetka: {
        type: String
    },
    datumKraja: {
        type: String
    },
    dekorater: {
        type: String
    },
    firma: {
        type: String
    },
    vlasnik:{
        type:String
    }
})

export default mongoose.model('Odrzavanje', Odrzavanje, 'odrzavanje');