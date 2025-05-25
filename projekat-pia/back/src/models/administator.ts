import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Administrator=new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    }
})

export default mongoose.model('Administrator', Administrator, 'administrator');