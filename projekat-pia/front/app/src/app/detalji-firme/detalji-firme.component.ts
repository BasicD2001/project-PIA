import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Firma } from '../models/firma';
import * as L from 'leaflet';
import Posao from '../models/posao';
import { Usluga } from '../models/usluga';
import IzgledBaste from '../models/izgledBaste';


@Component({
  selector: 'app-detalji-firme',
  templateUrl: './detalji-firme.component.html',
  styleUrls: ['./detalji-firme.component.css']
})
export class DetaljiFirmeComponent implements OnInit {
  constructor(private servis:UserService,private ruter:Router){}

  ngOnInit(): void {
    this.inicijalizujMapu()
   
      let naziv=localStorage.getItem('firmica')
      naziv=naziv==null?'':naziv
      this.naziv=naziv
      this.servis.getFirma(naziv).subscribe(
        f=>{
          this.firma=f
          this.pretraziAdresu()
          this.firma.usluge.forEach(usluga => {
            this.checkboxovi.push(false)
          });

        }
      )

      let novo=localStorage.getItem('ulogovan')
      this.vlasnik=novo==null?'':novo
      this.hidden1=false
      this.hidden2=true
      this.hidden3=true
      
  }
  naziv:string=''
  firma:Firma=new Firma()
  map: any
  marker: L.Marker | undefined;
  //datumPocetka:Date=new Date()
  datumPocetka:string=''
 //datumKraja:Date=new Date()
 datumKraja:string=''
  kvadraturaBaste:number=0
  tip:string=''
  posao:Posao=new Posao()
  greska:string=''
  bazen:number=0
  zelenilo:number=0
  lezaljke:number=0
  opis:string=''
  checkboxovi:boolean[]=[]
  greska1:string=''
  uslugeZaPosao:Usluga[]=[]
  fontana:number=0
  stolovi:number=0
  greska2:string=''
  hidden1:boolean=false
  hidden2:boolean=true
  hidden3:boolean=true
  vlasnik:string=''
  basta:IzgledBaste=new IzgledBaste()
  selectedFile: File | null = null;
   forma:FormData=new FormData()


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
    }
}


loadJson(): void {
  if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              const result = event.target?.result as string;

              if (!result) {
                  throw new Error('Prazan sadržaj fajla');
              }

              const data = JSON.parse(result);

              // Dodeli podatke instanci basta
              this.basta = Object.assign(new IzgledBaste(), data);

              console.log(this.basta); // Proveri ispravnost učitanih podataka
          } catch (error) {
              console.error('Greška pri parsiranju JSON-a:', error);
          }
      };

      reader.readAsText(this.selectedFile);
  } else {
      console.log('Nema izabranog fajla.');
  }
}





drawGarden(): void {
  const canvas = document.getElementById('gardenCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    if(this.posao.tip!=this.basta.tip) {
      alert('Unosite pogresan tip JSON fajla tj pogresan tip baste!')
      return
    }
      // Očisti canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Crtaj zelenilo
      this.basta.zelenilo.forEach(z => {
          ctx.fillStyle = 'green';
          ctx.fillRect(z.x, z.y, z.w, z.h);
      });

      // Crtaj bazen
      this.basta.bazen.forEach(b => {
          ctx.fillStyle = 'blue';
          ctx.fillRect(b.x, b.y, b.w, b.h);
      });

      // Crtaj fontanu
      this.basta.fontana.forEach(f => {
          ctx.fillStyle = 'blue';
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
      });

      // Crtaj stolove
      this.basta.sto.forEach(s => {
          ctx.fillStyle = 'brown';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
      });

      // Crtaj stolice
      this.basta.stolice.forEach(st => {
          ctx.fillStyle = 'gray';
          ctx.fillRect(st.x, st.y, st.w, st.h);
      });

      // Crtaj ležaljke
      this.basta.lezaljke.forEach(l => {
          ctx.fillStyle = 'gray';
          ctx.fillRect(l.x, l.y, l.w, l.h);
      });
  }
}


drawGarden2(): void {
  const canvas = document.getElementById('gardenCanvas2') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    if(this.posao.tip!=this.basta.tip) {
      alert('Unosite pogresan tip JSON fajla tj pogresan tip baste!')
      return
    }
      // Očisti canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Crtaj zelenilo
      this.basta.zelenilo.forEach(z => {
          ctx.fillStyle = 'green';
          ctx.fillRect(z.x, z.y, z.w, z.h);
      });

      // Crtaj bazen
      this.basta.bazen.forEach(b => {
          ctx.fillStyle = 'blue';
          ctx.fillRect(b.x, b.y, b.w, b.h);
      });

      // Crtaj fontanu
      this.basta.fontana.forEach(f => {
          ctx.fillStyle = 'blue';
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
      });

      // Crtaj stolove
      this.basta.sto.forEach(s => {
          ctx.fillStyle = 'brown';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();
      });

      // Crtaj stolice
      this.basta.stolice.forEach(st => {
          ctx.fillStyle = 'gray';
          ctx.fillRect(st.x, st.y, st.w, st.h);
      });

      // Crtaj ležaljke
      this.basta.lezaljke.forEach(l => {
          ctx.fillStyle = 'gray';
          ctx.fillRect(l.x, l.y, l.w, l.h);
      });
  }
}




















  inicijalizujMapu(): void {
    this.map = L.map('map').setView([51.673858, 7.815982], 10); // Podrazumevana lokacija

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }




  pretraziAdresu(): void {
    if (!this.firma.adresa) return;

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.firma.adresa)}&format=json&limit=1`;

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
          this.marker.bindPopup(`<b>${this.firma.adresa}</b>`).openPopup();
        } else {
          alert('Adresa nije pronađena.');
        }
      })
      .catch(error => {
        console.error('Greška prilikom geokodiranja:', error);
        alert('Greška prilikom geokodiranja.');
      });
  }

  step1(){
    if(!this.datumPocetka || !this.datumPocetka ||  !this.kvadraturaBaste  || !this.tip) {
      this.greska='Morate uneti sve podatke za sledecu fazu zakazivanja!'
      return
    } 

    //let kraj:string=new Date(this.datumKraja).toISOString().split('T')[0]
    //let pocetak:string=new Date(this.datumPocetka).toString().toString().split('T')[0]
    let kraj=this.datumKraja
    let pocetak=this.datumPocetka

    if((this.firma.odmor_od>=pocetak && this.firma.odmor_od<=kraj) ||(this.firma.odmor_do>=pocetak && this.firma.odmor_do<=kraj)){
      this.greska='Firma je na godisnjem odmoru za datume koje ste naveli!'
      return
    }
    if(pocetak>=kraj){
      this.greska='Datum izrade mora biti veci od datuma zavrsetka radova!'
      return
    }
    if(pocetak<new Date().toISOString().split('T')[0] || kraj<new Date().toISOString().split('T')[0]) {
      this.greska='Datumi moraju biti u buducnosti!'
      return
    }
    this.posao.datumPocetka=this.datumPocetka.toString()
    this.posao.datumKraja=this.datumKraja.toString()
    this.posao.kvadraturaBaste=this.kvadraturaBaste
    this.posao.firma=this.firma.naziv
    this.posao.tip=this.tip
    this.posao.opis=this.opis
    this.posao.vlasnik=this.vlasnik

    this.forma.append('datumPocetka',this.posao.datumPocetka)
    this.forma.append('datumKraja',this.posao.datumKraja)
    this.forma.append('kvadraturaBaste',this.posao.kvadraturaBaste.toString())
    this.forma.append('firma', this.posao.firma)
    this.forma.append('tip', this.posao.tip)
    this.forma.append('opis', this.posao.opis)
    this.forma.append('vlasnik',  this.posao.vlasnik)



    this.hidden1=true
    if(this.tip=='privatna') this.hidden2=false
    else this.hidden3=false


  }

  step2Basta(){
    if(! this.bazen || !this.zelenilo || !this.lezaljke){
      this.greska1='Niste uneli sve podatke za zavrsetak zakazivanja!'
      return
    } 

    if(this.kvadraturaBaste<this.zelenilo+this.bazen+this.lezaljke) {
      this.greska1='Kvadrature koje ste uneli nisu kompatibilne!'
      return
    }

    for(let i=0;i<this.checkboxovi.length;i++){
      if(this.checkboxovi[i]){
        this.uslugeZaPosao.push(this.firma.usluge[i])
      }
    }
    if(this.uslugeZaPosao.length===0) {
      this.greska1='Morate stiklirati makar jednu uslugu firme!'
      return
    }

    

    this.posao.bazen=this.bazen
    this.posao.zelenilo=this.zelenilo
    this.posao.lezaljke=this.lezaljke
    this.posao.opis=this.opis
    this.posao.usluge=this.uslugeZaPosao
    this.posao.opis=this.opis

    




    

    this.servis.savePosao(this.posao).subscribe(
      korisnik=>{
        if(korisnik){
          let data=new FormData()
          data.append('id',korisnik.id.toString())
          if (this.selectedFile)
            data.append('json', this.selectedFile);
          this.servis.sacuvajIzgledBaste(data).subscribe(
            poruka=>{
              if(poruka.msg=='ok'){
                alert('Uspesno je poslat zahtev!Sada ste u fazi cekanja majstora!')
                this.ngOnInit()
              } else {
                alert('Nije sacuvan posao u bazi!')
              }
            }
          )
        }
         
      
       
      }
    )

    
  }

  step2Restoran(){
    if(!this.fontana || !this.zelenilo || !this.stolovi){
      this.greska2='Niste uneli sve podatke!'
    }

    if(this.kvadraturaBaste<this.fontana+this.zelenilo){
      this.greska2='Kvadrature koje ste uneli nisu kompatibilne!'
      return
    }

    for(let i=0;i<this.checkboxovi.length;i++){
      if(this.checkboxovi[i]){
        this.uslugeZaPosao.push(this.firma.usluge[i])
      }
    }
    if(this.uslugeZaPosao.length===0) {
      this.greska1='Morate stiklirati makar jednu uslugu firme!'
      return
    }

    this.posao.fontana=this.fontana
    this.posao.zelenilo=this.zelenilo
    this.posao.stolovi=this.stolovi
    this.posao.usluge=this.uslugeZaPosao

    this.servis.savePosao(this.posao).subscribe(
      korisnik=>{
        if(korisnik){
          let data=new FormData()
          data.append('id',korisnik.id.toString())
          if (this.selectedFile)
            data.append('json', this.selectedFile);
          this.servis.sacuvajIzgledBaste(data).subscribe(
            poruka=>{
              if(poruka.msg=='ok'){
                alert('Uspesno je sacuvan posao u bazi!')
                this.ngOnInit()
              } else {
                alert('Nije sacuvan posao u bazi!')
              }
            }
          )
        }
         
      
       
      }
    )


  }





 











  

}
