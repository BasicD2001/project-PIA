import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Posao from '../models/posao';
import Odrzavanje from '../models/odrzavanje';
import { Firma } from '../models/firma';

@Component({
  selector: 'app-zakazi-odrzavanje',
  templateUrl: './zakazi-odrzavanje.component.html',
  styleUrls: ['./zakazi-odrzavanje.component.css']
})
export class ZakaziOdrzavanjeComponent implements OnInit {
  constructor(private ruter:Router,private servis:UserService){}

  posao:Posao=new Posao()

  datum:string=''

  odrzavanje:Odrzavanje=new Odrzavanje()

  error:string=''

  firma:Firma=new Firma()

  dekorater:string=''


  ngOnInit(): void {
    let naziv=localStorage.getItem('ulogovan')
    this.dekorater=naziv==null?'':naziv
      
      const poslic=localStorage.getItem('brojOdPosla')
      if(poslic){
        this.posao=JSON.parse(poslic)

        this.servis.getFirma(this.posao.firma).subscribe(
          f=>{
            this.firma=f
          }
        )
      }

  }


  potvrdi(){
    if(!this.datum){
      this.error='Niste uneli datum!'
      return
    }
    if(this.datum>=this.firma.odmor_od && this.datum<=this.firma.odmor_do){
      this.error='Firma je na godisnjem odmoru!'
      return
    }
    if(this.datum<new Date().toISOString().split('T')[0]){
      this.error='Ne mozete uneti datum u proslosti!'
      return
    }
    this.odrzavanje.vlasnik=this.posao.vlasnik
    this.odrzavanje.firma=this.posao.firma
    this.odrzavanje.idPosao=this.posao.id
    this.odrzavanje.datumPocetka=this.datum
    this.servis.checkAktuelniPoslovi(this.posao.dekorater,this.odrzavanje.datumPocetka,this.odrzavanje.datumPocetka).subscribe(
      poruka=>{
        if(poruka.msg=='ok'){
          this.servis.saveOdrzavanje(this.odrzavanje).subscribe(
            poruka=>{
              if(poruka.msg=='ok'){
                alert('Uspesno cuvanje odrzavanja')
                this.ruter.navigate(['odrzavanje'])
              } else {
                alert('Doslo je do greske')
              }
            }
          ) 
        }else {
          alert('Dekorater je zauzet u tom periodu!')
        }
      }
    )
    
  }


}
