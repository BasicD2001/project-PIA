import * as express from 'express';
import Vlasnik from '../models/vlasnik';
import Dekorater from '../models/dekorater';
import Administator from '../models/administator';
import Firma from '../models/firma';
import Posao from '../models/posao';
import Odrzavanje from '../models/odrzavanje';


import path, { parse } from 'path';

import crypto from 'crypto';
import dekorater from '../models/dekorater';
import vlasnik from '../models/vlasnik';
import firma from '../models/firma';
import posao from '../models/posao';

const hashPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
};





export class UserController {

    loginVlasnik = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = hashPassword(req.body.lozinka)

        Vlasnik.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka, 'zahtev': 'prihvacen', 'status': 'aktivan' }).then(
            vlasnik => {
                res.json(vlasnik)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

    }


    loginAdministrator = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = hashPassword(req.body.lozinka)

        Administator.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka }).then(
            admin => {
                res.json(admin)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

    }


    loginDekorater = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = hashPassword(req.body.lozinka)


        Dekorater.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka, 'status': 'aktivan' }).then(
            vlasnik => {
                res.json(vlasnik)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

    }


    saveVlasnik = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = hashPassword(req.body.lozinka)
        let ime = req.body.ime
        let prezime = req.body.prezime
        let pol = req.body.pol
        let adresa = req.body.adresa
        let telefon = req.body.kontakt_telefon
        let imejl = req.body.imejl
        console.log(req.file)

        let slika = req.file ? req.file.path : 'uploads/podrazumevano.png'; 
        let kartica = parseInt(req.body.kartica)
        let status = req.body.status

        let vlasnik = new Vlasnik({
            'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka, 'ime': ime,
            'prezime': prezime, 'pol': pol, 'adresa': adresa,
            'telefon': telefon, 'slika': slika, 'kartica': kartica, 'status': status, 'imejl': imejl, 'zahtev': 'obrada'
        })

        vlasnik.save().then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => { res.json({ 'msg': 'ok' }) }
        )

    }

    saveDekorater = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = hashPassword(req.body.lozinka)
        let ime = req.body.ime
        let prezime = req.body.prezime
        let pol = req.body.pol
        let adresa = req.body.adresa
        let telefon = req.body.kontakt_telefon
        let imejl = req.body.imejl
        let slika = req.file ? req.file.path : 'uploads/podrazumevano.png'; 
        let kartica = parseInt(req.body.kartica)
        let status = req.body.status
        let firma = req.body.firma
        let dekorater = new Dekorater({
            'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka, 'ime': ime,
            'prezime': prezime, 'pol': pol, 'adresa': adresa, 'telefon': telefon,
            'slika': slika, 'kartica': kartica, 'status': status, 'firma': firma,
            'poslovi': [], 'imejl': imejl, 'aktuelan':'ne'
        })

        dekorater.save().then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => { res.json({ 'msg': 'ok' }) }
        )

    }

    promeniSliku = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let slika = req.file ? req.file.path : 'uploads/podrazumevano.png'; 
        Vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'slika': slika }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )


    }

    
    promeniSliku2 = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let slika = req.file ? req.file.path : 'uploads/podrazumevano.png';
        Dekorater.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'slika': slika }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )


    }

    dodajSlikuBaste= (req: express.Request, res: express.Response) =>{
        let id=parseInt(req.body.id)
        let slika=req.file?.path
       let slika2:string=slika==null?'':slika
        console.log('ovo je id'+id)
        console.log(slika)

        Posao.findOneAndUpdate({'id':id},{'slikaBaste':slika2}).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }





    promeniIme = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let ime = req.body.ime

        Vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'ime': ime }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }

    promeniIme2 = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let ime = req.body.ime

        Dekorater.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'ime': ime }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }



    promeniPrezime = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let prezime = req.body.prezime

        vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'prezime': prezime }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }

    promeniPrezime2 = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let prezime = req.body.prezime

        Dekorater.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'prezime': prezime }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }


    promeniMejl = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let imejl = req.body.imejl

        Vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'imejl': imejl }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }


    promeniMejl2 = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let imejl = req.body.imejl

        Dekorater.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'imejl': imejl }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }





    promeniBroj = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let telefon = req.body.telefon

        Vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'telefon': telefon }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )

    }


    promeniBroj2 = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let telefon = req.body.telefon

        Dekorater.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'telefon': telefon }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )

    }






    promeniKarticu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let kartica = parseInt(req.body.kartica)

        Vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'kartica': kartica }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }

    promeniKarticu2 = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let kartica = parseInt(req.body.kartica)

        Dekorater.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'kartica': kartica }).then(
            ok => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': err })
            }
        )
    }


    getUsers = (req: express.Request, res: express.Response) => {
        let niz: String[] = []

        Vlasnik.find({}).then(
            vlasnici => {
                vlasnici.forEach(vlasnik => {
                    let naziv = vlasnik.korisnicko_ime
                    naziv = naziv == null ? '' : naziv
                    niz.push(naziv)
                });

                Dekorater.find({}).then(
                    dekorateri => {
                        dekorateri.forEach(dekorater => {
                            let naziv = dekorater.korisnicko_ime
                            naziv = naziv == null ? '' : naziv
                            niz.push(naziv)
                        });
                        res.json(niz)
                    }
                )

                
            }
        )
    }


    getEmails = (req: express.Request, res: express.Response) => {
        let niz: String[] = []
        Vlasnik.find({}).then(
            vlasnici => {
                vlasnici.forEach(vlasnik => {
                    let naziv = vlasnik.imejl
                    naziv = naziv == null ? '' : naziv
                    niz.push(naziv)
                });

                Dekorater.find({}).then(
                    dekorateri => {
                        dekorateri.forEach(dekorater => {
                            let naziv = dekorater.imejl
                            naziv = naziv == null ? '' : naziv
                            niz.push(naziv)
                        });
                        res.json(niz)
                    }
                   
                )

                
            }
        )
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let lozinka = hashPassword(req.body.lozinka)

        let staraLozinka = hashPassword(req.body.staraLozinka)

        let ime=req.body.ime

        Vlasnik.findOne({ 'korisnicko_ime': ime }).then(
            vlasnik => {
                if (vlasnik) {
                    Vlasnik.findOneAndUpdate({ 'korisnicko_ime': vlasnik.korisnicko_ime }, { 'lozinka': lozinka }).then(
                        poruka => {
                            res.json({ 'msg': 'ok' })
                        }
                    ).catch(
                        err => {
                            console.log("Prvi catch")
                            console.log(err)
                            res.json({ 'msg': err })
                        }
                    )
                } else {
                    Dekorater.findOne({ 'korisnicko_ime': ime }).then(
                        dekorater => {
                            if (dekorater) {
                                Dekorater.findOneAndUpdate({ 'korisnicko_ime': dekorater.korisnicko_ime }, { 'lozinka': lozinka }).then(
                                    poruka => {
                                        res.json({ 'msg': 'ok' })
                                    }
                                ).catch(
                                    err => {
                                        console.log("Prvi catch")
                                        console.log(err)
                                        res.json({ 'msg': err })
                                    }
                                )
                            } else {
                                console.log("ne")
                                res.json({ 'msg': 'Ne' })
                            }
                        }
                    )


                }


            }
        )



    }

    getVlasnik = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        Vlasnik.findOne({ 'korisnicko_ime': korisnicko_ime }).then(
            korisnik => {
                res.json(korisnik)
            }
        ).catch(
            err => { console.log(err) }
        )

    }

    getDekorater = (req: express.Request, res: express.Response) =>{
        let korisnicko_ime = req.body.korisnicko_ime

        Dekorater.findOne({ 'korisnicko_ime': korisnicko_ime }).then(
            dekorater => {
                res.json(dekorater)
            }
        ).catch(
            err => { console.log(err) }
        )
    }

    zahteviObrada = (req: express.Request, res: express.Response) => {
        let niz: String[] = []

        Vlasnik.find({ 'zahtev': 'obrada' }).then(
            vlasnici => {
                res.json(vlasnici)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    prihvatiZahtev = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        Vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'zahtev': 'prihvacen' }).then(
            poruka => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': 'ok' })
            }
        )
    }

    odbijZahtev = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime

        Vlasnik.findOneAndUpdate({ 'korisnicko_ime': korisnicko_ime }, { 'zahtev': 'odbijen' }).then(
            poruka => {
                res.json({ 'msg': 'ok' })
            }
        ).catch(
            err => {
                res.json({ 'msg': 'ok' })
            }
        )
    }

    saveFirma = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv
        let adresa = req.body.adresa
        let usluge = req.body.usluge
        let kontakt = req.body.kontakt
        let odmor_od = req.body.odmor_od
        let odmor_do = req.body.odmor_do

        let firma = new Firma({
            'naziv': naziv, 'adresa': adresa, 'usluge': usluge, 'kontakt': kontakt, 'odmor_od': odmor_od, 'odmor_do': odmor_do
            ,'ocena':0,'brojOcena':0,'komentari':[]
        })

        firma.save().then(poruka => {
            res.json({ 'msg': 'ok' })
        }
        ).catch(
            err => {
                res.json({ 'msg': 'ok' })
            }
        )
    }

    imenaFirmi= (req: express.Request, res: express.Response) =>{
        let niz:String[]=[]
        Firma.find({}).then(
            firme=>{
                firme.forEach(firma => {
                    let ime=firma.naziv
                    ime=ime==null?'':ime
                    niz.push(ime)

                });
                res.json(niz)

            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    dohvatiVlasnike= (req: express.Request, res: express.Response) =>{
        Vlasnik.find({}).then(
            vlasnici=>{
                res.json(vlasnici)
            }
        ).catch(
            err=>{
               console.log(err)
            }
        )
    }

    dohvatiDekoratere= (req: express.Request, res: express.Response) =>{

        Dekorater.find({}).then(
            dekorateri=>{
                res.json(dekorateri)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    promeniStatus= (req: express.Request, res: express.Response) =>{
        let korisnicko_ime=req.body.korisnicko_ime
        let status=req.body.status

        Vlasnik.findOneAndUpdate({'korisnicko_ime':korisnicko_ime},{'status':status}).then(
            ok=>{
                res.json({'msg':'ok'})
            }
        ).catch(
            err=>{
                res.json(err)
            }
        )
    }

    promeniStatus2= (req: express.Request, res: express.Response) =>{
        let korisnicko_ime=req.body.korisnicko_ime
        let status=req.body.status

        Dekorater.findOneAndUpdate({'korisnicko_ime':korisnicko_ime},{'status':status}).then(
            ok=>{
                res.json({'msg':'ok'})
            }
        ).catch(
            err=>{
                res.json(err)
            }
        )
    }


    dohvatiFirme= (req: express.Request, res: express.Response) =>{
        Firma.find({}).then(
            firme=>{
                res.json(firme)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    getFirma= (req: express.Request, res: express.Response) =>{
         let naziv=req.body.naziv
        Firma.findOne({'naziv':naziv}).then(
            firma=>{
                res.json(firma)
            }
        ).catch(
            err=>{
                res.json(err)
            }
        )
    }


    savePosao= (req: express.Request, res: express.Response) =>{
        let datumPocetka=req.body.datumPocetka
        let datumKraja=req.body.datumKraja
        let kvadraturaBaste=parseInt(req.body.kvadraturaBaste)
        let tip=req.body.tip
        let bazen=parseInt(req.body.bazen)
        let zelenilo=parseInt(req.body.zelenilo)
        let lezaljke=parseInt(req.body.lezaljke)
       
        let opis=req.body.opis
        let usluge=req.body.usluge
        let fontana=parseInt(req.body.fontana)
        let stolovi=parseInt(req.body.stolovi)
        let firma=req.body.firma
        let vlasnik=req.body.vlasnik
        

        let ID=1

        Posao.find({}).then(
            poslovi=>{
                poslovi.forEach(posao => {
                    ID=ID+1
                });

                let posao=new Posao({
                    'datumPocetka':datumPocetka,'datumKraja':datumKraja,'kvadraturaBaste':kvadraturaBaste,
                    'tip':tip,'bazen':bazen,'zelenilo':zelenilo,'lezaljke':lezaljke,
                    'opis':opis,'usluge':usluge,'fontana':fontana,'stolovi':stolovi,'firma':firma,
                    'dekorater':'','status':'zahtev','ocena':-1,'brojBazena':1,'brojFontana':1,
                    'id':ID,'komentar':'','datumZakazivanja':new Date().toISOString().split('T')[0],
                    'cekaMajstora':false,'odrzavanje':'','vlasnik':vlasnik,'slikaBaste':'','izgledBaste':''
        
                })
                posao.save().then(
                    korisnik=>{
                        res.json(korisnik)
                    }
                ).catch(
                    err=>{
                        console.log(err)
                        res.json({'msg':err})
                    }
                   
                )

            }

        )
       
    }

    PosaoAktuelno= (req: express.Request, res: express.Response) =>{
        let vlasnik=req.body.vlasnik
        Posao.find({'status':'aktuelno','vlasnik':vlasnik}).then(
            dekorateri=>{
                res.json(dekorateri)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    PosaoZavrseno= (req: express.Request, res: express.Response) =>{
        let vlasnik=req.body.vlasnik
        Posao.find({'status':'zavrseno','vlasnik':vlasnik}).then(
            dekorateri=>{
                res.json(dekorateri)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    PosaoZavrsenOdrzavanje= (req: express.Request, res: express.Response) =>{
        let vlasnik=req.body.vlasnik
        Posao.find({'status':'zavrseno','vlasnik':vlasnik,'cekaMajstora':false}).then(
            dekorateri=>{
                res.json(dekorateri)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    getPosao= (req: express.Request, res: express.Response) =>{
        let ID=parseInt(req.body.id)
        Posao.findOne({'id':ID}).then(
            posao=>{
                res.json(posao)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    azurirajKomentar= (req: express.Request, res: express.Response) =>{
        let id=parseInt(req.body.id)
        let komentar=req.body.komentar
        let firma=req.body.firma

        Posao.findOneAndUpdate({'id':id},{'komentar':komentar}).then(
            ok=>{
               
                Firma.findOneAndUpdate({'naziv':firma},{$push:{'komentari':komentar}}).then(
                    ok=>{
                        res.json({'msg':'ok'})
                    }
                ).catch(
                    err=>{
                        res.json({'msg':err})
                    }
                )
            }
        ).catch(
            err=>{
                res.json({'msg':err})
            }
        )
    }

    azurirajOcenu= (req: express.Request, res: express.Response) =>{
        let id=parseInt(req.body.id)
        let ocena=parseInt(req.body.ocena)
        let nazivFirme=req.body.nazivFirme

        Posao.findOneAndUpdate({'id':id},{'ocena':ocena}).then(
            ok=>{
               

                Firma.findOne({'naziv':nazivFirme}).then(
                    firma=>{
                        if(firma){
                            let br=firma.brojOcena
                            br=br==null?0:br
                            let grade=firma.ocena
                            grade=grade==null?0:grade
                            br++
                            grade = Math.round((grade + ocena) / br * 10) / 10;
                            Firma.findOneAndUpdate({'naziv':nazivFirme},{'brojOcena':br,'ocena':grade}).then(
                                ok=>{
                                    res.json({'msg':'ok'})
                                }
                            ).catch(
                                err=>{
                                    console.log(err)
                                    res.json({'msg':err})
                                }
                            )

                        }
                    }
                )

            }
        ).catch(
            err=>{
                res.json({'msg':err})
            }
        )
    }

    deletePosao= (req: express.Request, res: express.Response) =>{
        let id=parseInt(req.body.id)

        Posao.deleteOne({'id':id}).then(
            ok=>{
                res.json({'msg':'ok'})
            }
        ).catch(
            err=>{
                res.json({'msg':err})
            }
        )
    }

    posaoZahtev= (req: express.Request, res: express.Response) =>{
        let vlasnik=req.body.vlasnik
        Posao.find({'status':'zahtev','vlasnik':vlasnik}).then(
            p=>{
                res.json(p)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    odrzavanje= (req: express.Request, res: express.Response) =>{
        let vlasnik=req.body.vlasnik
        Posao.find({'status':'zavrseno','vlasnik':vlasnik,'cekaMajstora':true}).then(
            p=>{
                res.json(p)
                
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    changeOdrzavanje= (req: express.Request, res: express.Response) =>{
        let id=parseInt(req.body.id)

        Posao.findOneAndUpdate({'id':id},{'cekaMajstora':false}).then(
            ok=>{
                Odrzavanje.findOneAndDelete({'idPosao':id}).then(
                    ok=>{
                       
                        res.json({'msg':'ok'})
                    }
                ).catch(
                    err=>{
                        res.json({'msg':err})
                    }
                )
               
            }
        ).catch(
            err=>{
                res.json({'msg':err})
            }
        )
    }

    saveOdrzavanje= (req: express.Request, res: express.Response) =>{
        let idPosao=parseInt(req.body.idPosao)
        let datumPocetka=req.body.datumPocetka
        let datumKraja=req.body.datumKraja
        let dekorater=req.body.dekorater
        let firma=req.body.firma
        let vlasnik=req.body.vlasnik
        let nova=new Odrzavanje({
            'idPosao':idPosao,'dekorater':dekorater,'datumPocetka':datumPocetka,'datumKraja':datumKraja,
            'firma':firma,'vlasnik':vlasnik
        })

        nova.save({}).then(
            ok=>{


                Posao.findOneAndUpdate({'id':idPosao},{'cekaMajstora':true}).then(
                    ok=>{
                        res.json({'msg':'ok'})
                    }
                ).catch(
                    err=>{
                        res.json({'msg':err})
                    }
                )

                
            }
        ).catch(
            err=>{
                res.json({'msg':err})
            }
        )



    }
    
    getOdrzavanja= (req: express.Request, res: express.Response) =>{
        let vlasnik=req.body.vlasnik
        console.log(vlasnik)
        console.log('aaa')
        Odrzavanje.find({'vlasnik':vlasnik}).then(
            o=>{
                console.log(o)
                res.json(o)
            }
        ).catch(
            err=>{
                res.json(err)
            }
        )
    }

    posloviFirmeZahtev= (req: express.Request, res: express.Response) =>{
         let firma=req.body.firma

         Posao.find({'status':'zahtev','firma':firma}).sort({'datumPocetka':-1}).then(
            p=>{
                res.json(p)
            }
         ).catch(
            err=>{
                res.json(err)
            }
         )

    }

    dekoraterPrihvatiZahtev= (req: express.Request, res: express.Response) =>{
        let dekorater=req.body.dekorater
        let id=parseInt(req.body.id)
        
        Posao.findOneAndUpdate({'id':id},{$set:{'status':'aktuelno',
            'dekorater':dekorater}
        }).then(
            poruka=>{
                res.json({'msg':'ok'})
            }
        ).catch(err=>{
            res.json({'msg':err})
        })
    }

    dekoraterOdbijZahtev= (req: express.Request, res: express.Response) =>{
        let komentar=req.body.komentar
        let id=parseInt(req.body.id)
        Posao.findOneAndUpdate({'id':id},{'status':'odbijeno','komentar':komentar}).then(
            poruka=>{
                res.json({'msg':'ok'})
            }
        ).catch(err=>{
            res.json({'msg':err})
        })
    }

    dekoraterPrihvatiOdrzavanje= (req: express.Request, res: express.Response) =>{
        let idPosao=parseInt(req.body.idPosao)
        let datumKraja=req.body.datumKraja
        let dekorater=req.body.dekorater

        Odrzavanje.findOneAndUpdate({'idPosao':idPosao},{'dekorater':dekorater,'datumKraja':datumKraja}).then(
            poruka=>{

                Posao.findOneAndUpdate({'id':idPosao},{'odrzavanje':datumKraja}).then(
                    poruka=>{
                        res.json({'msg':'ok'})
                    }
                ).catch(err=>{
                    res.json({'msg':err})
                })
                

            }
        ).catch(err=>{
            res.json({'msg':err})
        })
    }


    dekoraterOdbijOdrzavanje= (req: express.Request, res: express.Response) =>{
        let idPosao=parseInt(req.body.idPosao)
        Odrzavanje.deleteOne({'idPosao':idPosao}).then(
            poruka=>{
                Posao.findOneAndUpdate({'id':idPosao},{'odrzavanje':'','cekaMajstora':false}).then(
                    poruka=>{
                        res.json({'msg':'ok'})
                    }
                ).catch(err=>{
                    res.json({'msg':err})
                })
            }
        ).catch(err=>{
            res.json({'msg':err})
        })
    }

    dekoraterPoslovi= (req: express.Request, res: express.Response) =>{
        let dekorater=req.body.dekorater

        Posao.find({'status':'zavrseno','dekorater':dekorater}).then(
            p=>{
                res.json(p)
            }
        ).catch(
            err=>{
                console.log(err) }
        )
    }

    dekoraterOdrzavanja= (req: express.Request, res: express.Response) =>{
        let firma=req.body.firma
        Odrzavanje.find({'datumKraja':'','firma':firma}).then(
            o=>{
                res.json(o)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    brojPoslovaPoMesecima= (req: express.Request, res: express.Response) =>{
        const dekorater = req.body.dekorater;
        const brojPoslova: number[] = new Array(12).fill(0);
        Posao.find({ 'dekorater': dekorater }).then(poslovi => {
            poslovi.forEach(posao => {
                if(posao.datumPocetka){
                    const datumPocetka = new Date(posao.datumPocetka); 
                    const mesec = datumPocetka.getMonth(); 
        
                  
                    brojPoslova[mesec]++;
                }
               
            });
    
           
            res.json(brojPoslova);
        }).catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Došlo je do greške prilikom dobijanja podataka.' });
        });
    }


    posloviMedjuDekoratorima = (req: express.Request, res: express.Response) => {
        let firma = req.body.firma;
        let niz: { 'dekorater': String, 'poslovi': Number }[] = [];
        
        Dekorater.find({ 'firma': firma }).then(d => {
            
            const promises = d.map(dekorater => {
                if (dekorater) {
                    return Posao.find({ 'dekorater': dekorater.korisnicko_ime }).then(poslovi => {
                        if (dekorater.korisnicko_ime) {
                            niz.push({ 'dekorater': dekorater.korisnicko_ime, 'poslovi': poslovi.length });
                        }
                    });
                }
            });
    
            
            return Promise.all(promises);
        }).then(() => {
            res.json(niz);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
    }


    prosecnoPoDanima = (req: express.Request, res: express.Response) => {
        let niz: number[] = new Array(7).fill(0);
        let firma = req.body.firma;
    
        const today = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);
    
        Posao.find({ 'firma': firma }).then(poslovi => {
            poslovi.forEach(posao => {
                if(posao.datumPocetka){
                    const datum = new Date(posao.datumPocetka);
                    const dayOfWeek = datum.getDay();
                    niz[dayOfWeek]++;
                }
               
            });
    
            
            res.json(niz);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        });
    }

    pocetnaBrojBasta = (req: express.Request, res: express.Response) =>{
        Posao.find({'status':'zavrseno'}).then(
            p=>{
                res.json(p.length)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    pocetnaBrojVlasnika = (req: express.Request, res: express.Response) =>{
        Vlasnik.find({}).then(
            v=>{
                res.json(v.length)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    pocetnaBrojDekoratera= (req: express.Request, res: express.Response) =>{
        Dekorater.find({}).then(
            d=>{
                res.json(
                    d.length
                )
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    zakazaniPoslovi24= (req: express.Request, res: express.Response) =>{
        Posao.find({'datumZakazivanja':new Date().toISOString().split(',')[0]}).then(
            d=>{
                res.json(
                    d.length
                )
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }

    zakazaniPoslovi7 = (req: express.Request, res: express.Response) => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        let datum:String=sevenDaysAgo.toISOString().split('T')[0]
    
        Posao.find({
            
            'datumZakazivanja': { $gte: datum }
        }).then(d => {
            res.json(d.length);
        }).catch(err => {
            console.log(err);
        });
    }

    zakazaniPoslovi30 = (req: express.Request, res: express.Response) => {
        let thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
       let datum:String=thirtyDaysAgo.toISOString().split('T')[0]
    
        Posao.find({
            
            'datumZakazivanja': { $gt: datum }
        }).then(d => {
            res.json(d.length);
        }).catch(err => {
            console.log(err);
        });
    }

    poslednjeSlike = (req: express.Request, res: express.Response) =>{
        let niz:String[]=[]
        Posao.find({'status':'zavrseno','slikaBaste': { $ne: '' }}).sort({'datumPocetka':-1}).then(
            p=>{
                p.forEach(posao => {
                    if(posao.slikaBaste){
                        niz.push(posao.slikaBaste)
                    }
                });
                res.json(niz)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }
    

    sacuvajIzgledBaste= (req: express.Request, res: express.Response) =>{
        let id=parseInt(req.body.id)
         let slika = req.file ? req.file.path : '';
         Posao.findOneAndUpdate({'id':id},{'izgledBaste':slika}).then(
            ok=>{
                res.json({'msg':'ok'})
            }
         ).catch(
            err=>{
                res.json({'msg':err})
            }
         )
    }

    homeUpdate = async (req: express.Request, res: express.Response) => {
        try {
            const danasnjiDatum = new Date(); 
            let datum:string=danasnjiDatum.toISOString().split('T')[0]
    
            
            await Posao.updateMany(
                {
                    status: 'aktuelno',
                    datumKraja: { $lte: datum }
                },
                { $set: { status: 'zavrseno' } }
            );
    
            
            res.json({ msg: 'ok' });
        } catch (error) {
            console.error('Greška prilikom ažuriranja statusa:', error);
            res.json({ msg: 'Došlo je do greške prilikom ažuriranja.' });
        }
    };

    updateDekoraterStatus = async (req: express.Request, res: express.Response) => {
        try {
            const danasnjiDatum:String = new Date().toISOString().split('T')[0]; 
    
            const zavrseniPoslovi = await Posao.find({
                status: 'zavrseno',
                slikaBaste: '',
                datumKraja: { $ne: danasnjiDatum } // $ne: not equal
            }).select('dekorater'); // Selektuj samo dekoratera
    
            const dekorateriIds = zavrseniPoslovi.map(posao => posao.dekorater);
    
            // Ažuriraj status dekoratera na 'neaktivan'
            await Dekorater.updateMany(
                { korisnicko_ime: { $in: dekorateriIds } },
                { $set: { status: 'neaktivan' } }
            );
    
            res.json({ msg: 'Status dekoratera ažuriran.' });
        } catch (error) {
            console.error('Greška prilikom ažuriranja dekoratera:', error);
            res.json({ msg: 'Došlo je do greške prilikom ažuriranja dekoratera.' });
        }
    };




    checkAktuelniPoslovi = async (req: express.Request, res: express.Response) => {
        try {
            const pocetak = req.body.pocetak;
            const kraj = req.body.kraj;
            const dekoraterKorisnickoIme = req.body.dekoraterKorisnickoIme;
    
            const aktuelniPoslovi = await Posao.find({
                dekorater: dekoraterKorisnickoIme,
                status: 'aktuelno',
                $or: [
                    {
                        datumPocetka: { $lte: kraj, $gte: pocetak } 
                    },
                    {
                        datumKraja: { $gte: pocetak, $lte: kraj }
                    },
                    {
                        datumPocetka: { $lte: pocetak },
                        datumKraja: { $gte: kraj }
                    }
                ]
            });
    
            if (aktuelniPoslovi.length === 0) {
                return res.json({ msg: 'ok' }); // Nema aktuelnih poslova
            } else {
                console.log('KORISNIK JE ZAUZET ZA')
                console.log(aktuelniPoslovi[0])
                return res.json({ msg: 'ne' }); // Postoji aktuelan posao
                
            }
        } catch (error) {
            console.error('Greška prilikom provere poslova:', error);
            return res.json({ msg: 'Greška' });
        }
    };



    checkAktuelnoOdrzavanje = async (req: express.Request, res: express.Response) => {
        try {
            const pocetak = req.body.pocetak;
            const kraj = req.body.kraj;
            const dekoraterKorisnickoIme = req.body.dekoraterKorisnickoIme;
    
            const aktuelnoOdrzavanje = await Odrzavanje.find({
                dekorater: dekoraterKorisnickoIme,
                $or: [
                    {
                        datumPocetka: { $lte: kraj, $gte: pocetak } 
                    },
                    {
                        datumKraja: { $gte: pocetak, $lte: kraj }
                    },
                    {
                        datumPocetka: { $lte: pocetak },
                        datumKraja: { $gte: kraj }
                    }
                ]
            });
    
            if (aktuelnoOdrzavanje.length === 0) {
                return res.json({ msg: 'ok' });
            } else {
                console.log('DEKORATER JE ZAUZET ZA ODRŽAVANJE');
                console.log(aktuelnoOdrzavanje[0]);
                return res.json({ msg: 'ne' }); 
            }
        } catch (error) {
            console.error('Greška prilikom provere održavanja:', error);
            return res.json({ msg: 'Greška' }); 
        }
    };
    



    
    
    

}