import mongoose from 'mongoose'

const Schema = mongoose.Schema;


let Dekorater = new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
   
    slika: {
        type: String
    },
    kartica: {
        type: Number
    },
    status: {
        type: String
    },
    firma: {
        type: String
    },
    poslovi: {
        type: Array
    },
    imejl: {
        type: String

    },
    aktuelan: {
        type: String

    },
    

})

export default mongoose.model('Dekorater', Dekorater, 'dekorater');