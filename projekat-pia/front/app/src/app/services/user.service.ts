import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Vlasnik from '../models/vlasnik';
import Dekorater from '../models/dekorater';
import Poruka from '../models/poruka';
import Administrator from '../models/administrator';
import { Usluga } from '../models/usluga';
import { Firma } from '../models/firma';
import Posao from '../models/posao';
import Odrzavanje from '../models/odrzavanje';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = "http://localhost:4000/user";


  loginVlasnik(korisnicko_ime:string,lozinka:string){
    
    let data={
      korisnicko_ime:korisnicko_ime,lozinka:lozinka
    }
    return this.http.post<Vlasnik>(`${this.uri}/loginVlasnik`, data)

  }

  loginDekorater(korisnicko_ime:string,lozinka:string){
    
    let data={
      korisnicko_ime:korisnicko_ime,lozinka:lozinka
    }
    return this.http.post<Dekorater>(`${this.uri}/loginDekorater`, data)

  }

  // saveVlasnik(korisnicko_ime:string,lozinka:string,ime:string,prezime:string,pol:string,adresa:string,telefon:string,slika:string
  //   ,kartica:number,status:string
  // ){
  //   let data={
  //     korisnicko_ime:korisnicko_ime,lozinka:lozinka,ime:ime,prezime:prezime,pol:pol,adresa:adresa,telefon:telefon,slika:slika,kartica:kartica,
  //     status:status
  //   }

  //   return this.http.post<Poruka>(`${this.uri}/saveVlasnik`, data)


  //}
  saveVlasnik(vlasnik:FormData){
       return this.http.post<Poruka>(`${this.uri}/saveVlasnik`, vlasnik)

  }

  saveDekorater(dekorater:FormData){
    return this.http.post<Poruka>(`${this.uri}/saveDekorater`, dekorater)

  }

  promeniSliku(vlasnik:FormData){
    return this.http.post<Poruka>(`${this.uri}/promeniSliku`, vlasnik)

  }

  promeniSliku2(dekorater:FormData){
    return this.http.post<Poruka>(`${this.uri}/promeniSliku2`, dekorater)

  }

  dodajSlikuBaste(forma:FormData){
    return this.http.post<Poruka>(`${this.uri}/dodajSlikuBaste`, forma)

  }

  getUsers(){
    return this.http.post<string[]>(`${this.uri}/getUsers`, {'nista':'nista'})

  }

  changePassword(lozinka:string,staraLozinka:string,ime:string) {
    let data={lozinka:lozinka,staraLozinka:staraLozinka,ime:ime}
    return this.http.post<Poruka>(`${this.uri}/changePassword`,data)


  }

  getEmails(){
    return this.http.post<string[]>(`${this.uri}/getEmails`, {'nista':'nista'})

  }

  getVlasnik(korisnicko_ime:string){
    let data={korisnicko_ime:korisnicko_ime}
    return this.http.post<Vlasnik>(`${this.uri}/getVlasnik`, data)

  }

  getDekorater(korisnicko_ime:string){
    let data={korisnicko_ime:korisnicko_ime}
    return this.http.post<Dekorater>(`${this.uri}/getDekorater`, data)

  }

  promeniIme(korisnicko_ime:string,ime:string){
    let data={korisnicko_ime:korisnicko_ime,ime:ime}
    return this.http.post<Poruka>(`${this.uri}/promeniIme`, data)
  }

  promeniIme2(korisnicko_ime:string,ime:string){
    let data={korisnicko_ime:korisnicko_ime,ime:ime}
    return this.http.post<Poruka>(`${this.uri}/promeniIme2`, data)
  }



  promeniPrezime(korisnicko_ime:string,prezime:string){
    let data={korisnicko_ime:korisnicko_ime,prezime:prezime}
    return this.http.post<Poruka>(`${this.uri}/promeniPrezime`, data)
  }

  promeniPrezime2(korisnicko_ime:string,prezime:string){
    let data={korisnicko_ime:korisnicko_ime,prezime:prezime}
    return this.http.post<Poruka>(`${this.uri}/promeniPrezime2`, data)
  }

  promeniMejl(korisnicko_ime:string,imejl:string){
    let data={korisnicko_ime:korisnicko_ime,imejl:imejl}
    return this.http.post<Poruka>(`${this.uri}/promeniMejl`, data)

  }

  promeniMejl2(korisnicko_ime:string,imejl:string){
    let data={korisnicko_ime:korisnicko_ime,imejl:imejl}
    return this.http.post<Poruka>(`${this.uri}/promeniMejl2`, data)

  }

  promeniBroj(korisnicko_ime:string,telefon:string){
    let data={korisnicko_ime:korisnicko_ime,telefon:telefon}
    return this.http.post<Poruka>(`${this.uri}/promeniBroj`, data)

  }

  promeniBroj2(korisnicko_ime:string,telefon:string){
    let data={korisnicko_ime:korisnicko_ime,telefon:telefon}
    return this.http.post<Poruka>(`${this.uri}/promeniBroj2`, data)

  }

  promeniKarticu(korisnicko_ime:string,kartica:number){
    let data={korisnicko_ime:korisnicko_ime,kartica:kartica}
    return this.http.post<Poruka>(`${this.uri}/promeniKarticu`, data)

  }

  promeniKarticu2(korisnicko_ime:string,kartica:number){
    let data={korisnicko_ime:korisnicko_ime,kartica:kartica}
    return this.http.post<Poruka>(`${this.uri}/promeniKarticu2`, data)

  }


  loginAdministrator(korisnicko_ime:string,lozinka:string){
    let data={
      korisnicko_ime:korisnicko_ime,lozinka:lozinka
    }
    return this.http.post<Administrator>(`${this.uri}/loginAdministrator`, data)

  }

  zahteviObrada(){
    return this.http.post<Vlasnik[]>(`${this.uri}/zahteviObrada`, {'nista':'nista'})

  }

  prihvatiZahtev(korisnicko_ime:string){
    let data={korisnicko_ime:korisnicko_ime}
    return this.http.post<Poruka>(`${this.uri}/prihvatiZahtev`, data)

  }

  odbijZahtev(korisnicko_ime:string){
    let data={korisnicko_ime:korisnicko_ime}
    return this.http.post<Poruka>(`${this.uri}/odbijZahtev`, data)

  }


  saveFirma(naziv:string,adresa:string,usluge:Usluga[],kontakt:string,odmor_od:string,odmor_do:string){
    let data={
      naziv:naziv,adresa:adresa,usluge:usluge,kontakt:kontakt,odmor_od:odmor_od,odmor_do:odmor_do
    }

    return this.http.post<Poruka>(`${this.uri}/saveFirma`, data)

  }

  imenaFirmi(){
    return this.http.post<string[]>(`${this.uri}/imenaFirmi`, {'nista':'nista'})

  }

  dohvatiVlasnike(){
    return this.http.post<Vlasnik[]>(`${this.uri}/dohvatiVlasnike`, {'nista':'nista'})

  }

  dohvatiDekoratere(){
    return this.http.post<Dekorater[]>(`${this.uri}/dohvatiDekoratere`, {'nista':'nista'})

  }

  promeniStatus(korisnicko_ime:string,status:string){
    let data={korisnicko_ime:korisnicko_ime,status:status}
    return this.http.post<Poruka>(`${this.uri}/promeniStatus`, data)

  }

  promeniStatus2(korisnicko_ime:string,status:string){
    let data={korisnicko_ime:korisnicko_ime,status:status}
    return this.http.post<Poruka>(`${this.uri}/promeniStatus2`, data)

  }

  dohvatiFirme(){
    return this.http.post<Firma[]>(`${this.uri}/dohvatiFirme`, {'nista':'nista'})

  }

  getFirma(naziv:string){
    let data={
      naziv:naziv
    }
    return this.http.post<Firma>(`${this.uri}/getFirma`, data)

  }

  savePosao(posao:Posao){
    return this.http.post<Posao>(`${this.uri}/savePosao`, posao)
 
  }

  PosaoAktuelno(vlasnik:string){
    let data={
      vlasnik:vlasnik
    }
    return this.http.post<Posao[]>(`${this.uri}/PosaoAktuelno`, data)

  }

  PosaoZavrseno(vlasnik:string){
    let data={
      vlasnik:vlasnik
    }
    return this.http.post<Posao[]>(`${this.uri}/PosaoZavrseno`, data)

  }

  PosaoZavrsenOdrzavanje(vlasnik:string){
    let data={
      vlasnik:vlasnik
    }
    return this.http.post<Posao[]>(`${this.uri}/PosaoZavrsenOdrzavanje`, data)

  }

  getPosao(ID:number){
    let data={id:ID}
    return this.http.post<Posao>(`${this.uri}/getPosao`, data)
  }

  azurirajKomentar(id:number,komentar:string,firma:string){
    let data={
      id:id,komentar:komentar,firma:firma
    }
    return this.http.post<Poruka>(`${this.uri}/azurirajKomentar`, data)
  }

  azurirajOcenu(id:number,ocena:number,nazivFirme:string){
    let data={
      id:id,ocena:ocena,nazivFirme:nazivFirme
    }
    return this.http.post<Poruka>(`${this.uri}/azurirajOcenu`, data)

  }

  deletePosao(id:number){
    let data={
      id:id
    }

    return this.http.post<Poruka>(`${this.uri}/deletePosao`, data)

  }

  posaoZahtev(vlasnik:string){
    let data={
      vlasnik:vlasnik
    }
    return this.http.post<Posao[]>(`${this.uri}/posaoZahtev`, data)

  }

  odrzavanje(vlasnik:string){
    let data={
      vlasnik:vlasnik
    }
    return this.http.post<Posao[]>(`${this.uri}/odrzavanje`, data)

  }

  changeOdrzavanje(id:number){
    let data={
      id:id
    }
    return this.http.post<Poruka>(`${this.uri}/changeOdrzavanje`, data)

  }

  saveOdrzavanje(odrzavanje:Odrzavanje){
    return this.http.post<Poruka>(`${this.uri}/saveOdrzavanje`, odrzavanje)

  }

  getOdrzavanja(vlasnik:string){
    let data={
      vlasnik:vlasnik
    }
    return this.http.post<Odrzavanje[]>(`${this.uri}/getOdrzavanja`, data)

  }

  posloviFirmeZahtev(firma:string){
    let data={
      firma:firma
    }
    return this.http.post<Posao[]>(`${this.uri}/posloviFirmeZahtev`, data)

  }

  dekoraterPrihvatiZahtev(dekorater:string,id:number){
    let data={
      dekorater:dekorater,id:id
    }
    return this.http.post<Poruka>(`${this.uri}/dekoraterPrihvatiZahtev`, data)

  }

  dekoraterOdbijZahtev(komentar:string,id:number){
    let data={
      komentar:komentar,id:id
    }
    return this.http.post<Poruka>(`${this.uri}/dekoraterOdbijZahtev`, data)

  }

  dekoraterPrihvatiOdrzavanje(idPosao:number,datumKraja:string,dekorater:string){
    let data={
      idPosao:idPosao,datumKraja:datumKraja,dekorater:dekorater
    }
    return this.http.post<Poruka>(`${this.uri}/dekoraterPrihvatiOdrzavanje`, data)

  }

  dekoraterOdbijOdrzavanje(idPosao:number){
    let data={
      idPosao:idPosao
    }
    return this.http.post<Poruka>(`${this.uri}/dekoraterOdbijOdrzavanje`, data)

  }


  dekoraterPoslovi(dekorater:string){
    let data={
      dekorater:dekorater
    }
    return this.http.post<Posao[]>(`${this.uri}/dekoraterPoslovi`, data)

  }

  dekoraterOdrzavanja(firma:string){
    let data={
      firma:firma
    }
    return this.http.post<Odrzavanje[]>(`${this.uri}/dekoraterOdrzavanja`, data)


  }

  brojPoslovaPoMesecima(dekorater:string){
    let data={
      dekorater:dekorater
    }
    return this.http.post<number[]>(`${this.uri}/brojPoslovaPoMesecima`, data)

  }

  posloviMedjuDekoratorima(firma:string){
    let data={
      firma:firma
    }
    return this.http.post<{'dekorater':string,'poslovi':number}[]>(`${this.uri}/posloviMedjuDekoratorima`, data)

  }

  prosecnoPoDanima(firma:string){
    let data={
      firma:firma
    }
    return this.http.post<number[]>(`${this.uri}/prosecnoPoDanima`, data)

  }

  pocetnaBrojBasta(){
    return this.http.post<number>(`${this.uri}/pocetnaBrojBasta`, {'nista':'nista'})

  }

  pocetnaBrojVlasnika(){
    return this.http.post<number>(`${this.uri}/pocetnaBrojVlasnika`, {'nista':'nista'})

  }

  pocetnaBrojDekoratera(){
    return this.http.post<number>(`${this.uri}/pocetnaBrojDekoratera`, {'nista':'nista'})

  }

  zakazaniPoslovi24(){
    return this.http.post<number>(`${this.uri}/zakazaniPoslovi24`, {'nista':'nista'})

  }

  zakazaniPoslovi7(){
    return this.http.post<number>(`${this.uri}/zakazaniPoslovi7`, {'nista':'nista'})

  }

  zakazaniPoslovi30(){
    return this.http.post<number>(`${this.uri}/zakazaniPoslovi30`, {'nista':'nista'})

  }

  poslednjeSlike(){
    return this.http.post<string[]>(`${this.uri}/poslednjeSlike`, {'nista':'nista'})

  }

  sacuvajIzgledBaste(forma:FormData){
    return this.http.post<Poruka>(`${this.uri}/sacuvajIzgledBaste`, forma)

  }

  homeUpdate(){
    return this.http.post<Poruka>(`${this.uri}/homeUpdate`, {'nista':'nista'})

  }

  updateDekoraterStatus(){
    return this.http.post<Poruka>(`${this.uri}/updateDekoraterStatus`, {'nista':'nista'})

  }

  checkAktuelniPoslovi(dekoraterKorisnickoIme:string,pocetak:string,kraj:string){
    let data={
      dekoraterKorisnickoIme:dekoraterKorisnickoIme,pocetak:pocetak,kraj:kraj
      
    }
    return this.http.post<Poruka>(`${this.uri}/checkAktuelniPoslovi`, data)

  }

  checkAktuelnoOdrzavanje(dekoraterKorisnickoIme:string,pocetak:string,kraj:string){
    let data={
      dekoraterKorisnickoIme:dekoraterKorisnickoIme,pocetak:pocetak,kraj:kraj
      
    }
    return this.http.post<Poruka>(`${this.uri}/checkAktuelnoOdrzavanje`, data)

  }


}
