import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Firma } from '../models/firma';
import { Usluga } from '../models/usluga';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styleUrls: ['./firma.component.css']
})
export class FirmaComponent implements OnInit {
  adresa: string = '';
  naziv:string=''
  map: any
  marker: L.Marker | undefined;
  cena:number=0;
  usluga:string=''
  error:string=''
  datum_od:Date=new Date()
  datum_do:Date=new Date()
  dalje:string=''
  kontakt:string=''

  firma:Firma=new Firma()
  usluge:Usluga[]=[]

  prvaTabela:boolean=true

  korisnickaImena:string[]=[]
  mejlovi:string[]=[]
  imenaFirmi:string[]=[]


  korisnicko_ime2:string=''
  lozinka2:string=''
  ime2:string=''
  prezime2:string=''
  pol2:string=''
  adresa2:string=''
  telefon2:string=''
  kartica2:number=0
  karticaIkonica: string = '';
  validnaLozinka: boolean = true;
  picture: File | null = null
  greskica:string=''
  imejl2:string=''
  status2:string=''
  brojDekoratera:number=0
  nedovoljno:string=''





  dinersRegex = /^(300|301|302|303|36|38)\d{12}$/;

  masterCardRegex = /^(51|52|53|54|55)\d{14}$/;


  visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;



  lozinkaRegex = /^(?=[A-Za-z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^\&*\)\(+=._-]).{6,10}$/;


  phoneRegex = /^\+3816\d{8}$/; // Broj telefona: +3816 i 8 cifara
  emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;





  constructor(private servis:UserService,private ruter:Router) {}

  ngOnInit(): void {
    // Delay the map initialization
    setTimeout(() => {
      if (this.prvaTabela) {
        this.inicijalizujMapu();
      }
    }, 0);
    this.servis.getUsers().subscribe(
      imena => {
        this.korisnickaImena = imena
      }
    )
    this.servis.getEmails().subscribe(
      niz=>{
        this.mejlovi=niz
      }
    )
    this.servis.imenaFirmi().subscribe(
      imena=>{
        this.imenaFirmi=imena
      }
    )

    this.resetValues()
   
  }

  inicijalizujMapu(): void {
    this.map = L.map('map').setView([51.673858, 7.815982], 10); // Podrazumevana lokacija

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  pretraziAdresu(): void {
    if (!this.adresa) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.adresa)}&format=json&limit=1`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          if (this.map && this.marker) {
            this.map.removeLayer(this.marker); // Ukloni prethodni marker ako postoji
          }

          this.map.setView([lat, lon], 15); // Prikazivanje mape sa novom lokacijom

          this.marker = L.marker([lat, lon]).addTo(this.map);
          this.marker.bindPopup(`<b>${this.adresa}</b>`).openPopup();
        } else {
          alert('Adresa nije pronađena.');
        }
      })
      .catch(error => {
        console.error('Greška prilikom geokodiranja:', error);
        alert('Greška prilikom geokodiranja.');
      });
  }

  dodajUslugu(){
    if(!this.usluga || !this.cena) {
      this.error='Niste uneli potrebne podatke!'
    } else {
      let nova:Usluga=new Usluga()
      nova.naziv=this.usluga
      nova.cena=this.cena
      this.usluge.push(nova)
      this.error='Usluga sacuvana,mozete dodati sledecu'
    }
  }

  saljiPodatke(){
    this.dalje=''
    if(!this.naziv || !this.usluga || !this.cena || !this.adresa || !this.datum_od || !this.datum_do || !this.kontakt ) {
      this.dalje='Niste popunili sve podatke!'
      return;
    }
    if(this.datum_od>=this.datum_do){
      this.dalje='Pocetak odmora mora biti pre kraja odmora!'
      return
    }
    if(this.datum_od.toString()<new Date().toISOString().split('T')[0] || this.datum_do.toString()<
    new Date().toISOString().split('T')[0]){
      this.dalje='Datumi moraju biti u buducnosti!'
    }
    if(this.imenaFirmi.includes(this.naziv)){
      this.dalje='Naziv firme vec postoji u bazi!'
      return
    }
    if(!this.phoneRegex.test(this.kontakt)){
      this.dalje='Broj nije u trazenom formatu!'
      return
    }
    else {
      this.firma.naziv=this.naziv
      this.firma.adresa=this.adresa
      this.firma.odmor_do=(this.datum_do.toString())
      this.firma.odmor_od=this.datum_od.toString()
      this.firma.usluge=this.usluge
      this.prvaTabela=false
      
    }
  }


  proveriKarticu(brojK: number) {
    let brojKartice = brojK.toString()
    if (this.dinersRegex.test(brojKartice)) {
      this.karticaIkonica = 'assets/kartice/dina.jpeg';
    } else if (this.masterCardRegex.test(brojKartice)) {
      this.karticaIkonica = 'assets/kartice/master.png';
    } else if (this.visaRegex.test(brojKartice)) {
      this.karticaIkonica = 'assets/kartice/visa.png';
    } else {
      this.karticaIkonica = ''; // Ако није важећа картица
    }
  }

  proveriLozinku() {
    // Провера да ли унети текст у пољу за лозинку одговара регексу
    this.validnaLozinka = this.lozinkaRegex.test(this.lozinka2);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.picture = file;  // Čuva sliku ako je u pravilnom formatu
    } else {
      alert("Samo JPG/PNG formati su podržani!");
    }
  }

  saveDekorater(){
    this.greskica=''
    if(!this.korisnicko_ime2 || !this.lozinka2 || !this.ime2 || !this.prezime2 || !this.pol2 || !this.adresa2
      || !this.telefon2 || !this.kartica2
    ) {
      this.greskica='Niste uneli sve podatke!'
       return
    }
    if (!this.validnaLozinka || this.karticaIkonica == '') {
      this.greskica='Lozinka ili kartica nisu u odgovarajucem formatu!'
    }

    if (this.korisnickaImena.includes(this.korisnicko_ime2)) {
      this.greskica = "Korisnicko ima je zauzeto!"
      return
    }
    if(this.mejlovi.includes(this.imejl2)){
      this.greskica="Imejl adresa je zauzeta!"
      return
    }
    if(!this.emailRegex.test(this.imejl2)){
      this.greskica='Imejl nije u trazenom formatu'
      return
    }
    if(!this.phoneRegex.test(this.telefon2)){
      this.greskica='Telefon nije u trazenom formatu'
      return
    }

    const formData = new FormData();
    formData.append('korisnicko_ime',this.korisnicko_ime2)
    formData.append('lozinka',this.lozinka2)
    formData.append('ime',this.ime2)
    formData.append('prezime',this.prezime2)
    if (this.picture)
      formData.append('slika', this.picture);
    formData.append('pol',this.pol2)
    formData.append('adresa',this.adresa2)
    formData.append('kontakt_telefon',this.telefon2)
    formData.append('imejl',this.imejl2)
    formData.append('kartica',this.kartica2.toString())
    formData.append('firma',this.naziv)
    formData.append('status',this.status2)
    this.greskica=''

    this.servis.saveDekorater(formData).subscribe(
      poruka => {
        if (poruka.msg == 'ok') { alert("Dekorater je sacuvan u bazi")
           this.brojDekoratera++
          this.ngOnInit() }
      }
    )

  }

  saveFirma(){
    if(this.brojDekoratera<2) {
      this.nedovoljno='Morate uneti makar 2 dekoratera!!'
    }
   
    else{
      alert('Svi podaci za firmu su ispisani')
      this.servis.saveFirma(this.naziv,this.adresa,this.usluge,this.kontakt,this.datum_od.toString(),this.datum_do.toString())
      .subscribe(
        ok=>{
          this.ruter.navigate(['admin2'])
        }
      )
    }
  }

  resetValues(): void {
    this.korisnicko_ime2 = '';
    this.lozinka2 = '';
    this.ime2 = '';
    this.prezime2 = '';
    this.pol2 = '';
    this.adresa2 = '';
    this.telefon2 = '';
    this.kartica2 = 0;
    this.karticaIkonica = '';
    this.validnaLozinka = true;
    this.picture = null;
    this.greskica = '';
    this.imejl2 = '';
    this.status2 = '';
    
    this.nedovoljno = '';
}
   
}
