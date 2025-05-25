import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Odrzavanje from '../models/odrzavanje';
import Dekorater from '../models/dekorater';

@Component({
  selector: 'app-dekorater-zakazivanja',
  templateUrl: './dekorater-zakazivanja.component.html',
  styleUrls: ['./dekorater-zakazivanja.component.css']
})
export class DekoraterZakazivanjaComponent implements OnInit{
  constructor(private servis:UserService,private ruter:Router){}

  odrzavanja:Odrzavanje[]=[]

  dekorater:Dekorater=new Dekorater()

  error:string=''

  datum:string=''

  ngOnInit(): void {
    let naziv=localStorage.getItem('ulogovan')
    naziv=naziv==null?'':naziv

    this.servis.getDekorater(naziv).subscribe(
      d=>{
        this.dekorater=d

        this.servis.dekoraterOdrzavanja(this.dekorater.firma).subscribe(
          o=>{
            this.odrzavanja=o
          }
        )
      }
    )


  }

  prihvati(o:Odrzavanje){
    this.error=''
    if(!this.datum){
     alert('Morate uneti datum!')
      return
  }
  if(this.datum<new Date().toISOString().split('T')[0]){
    this.error='Morate uneti datum u buducnosti!'
    return
  }
  if(this.datum<o.datumPocetka){
    this.error='Datum zavrsetka mora biti veci od datuma pocetka!'
    return
  }

  this.servis.checkAktuelniPoslovi(this.dekorater.korisnicko_ime,o.datumPocetka,o.datumPocetka).subscribe(
    poruka=>{
      if(poruka.msg=='ok'){
        this.servis.dekoraterPrihvatiOdrzavanje(o.idPosao,this.datum,this.dekorater.korisnicko_ime).subscribe(
          poruka=>{
            if(poruka.msg=='ok'){
              alert('Uspesno prihvatanje!')
              this.ngOnInit()
            } else {
              alert('Doslo je do greske')
            }
          }
        )
      } else {
        alert('Korisnik je zauzet u tom periodu!')
      }
    }
  )
  
    
  }

  odbij(o:Odrzavanje){
   
    this.servis.dekoraterOdbijOdrzavanje(o.idPosao).subscribe(
    
      poruka=>{
        if(poruka.msg=='ok'){
          alert('Uspesno prihvatanje!')
          this.ngOnInit()
        } else {
          alert('Doslo je do greske')
        }
      }
    )
  }
}

