import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Route, Router } from '@angular/router';
import Posao from '../models/posao';

@Component({
  selector: 'app-azuriraj-cena',
  templateUrl: './azuriraj-cena.component.html',
  styleUrls: ['./azuriraj-cena.component.css']
})
export class AzurirajCenaComponent implements OnInit {
  constructor(private servis:UserService,private ruter:Router){}

  ngOnInit(): void {
       let str=localStorage.getItem('id')
        str=str==null?'':str
        let broj=parseInt(str)
        this.servis.getPosao(broj).subscribe(
          p=>{
            this.posao=p
          }
        )  
  }
  komentar:string=''
  ocena:number=0;

  posao:Posao=new Posao()

  stars = Array(5).fill(0); // Kreira niz sa 5 elemenata
  rating = 0; // Početna ocena
  error:string=''

  setRating(value: number): void {
    this.rating = value; // Postavlja ocenu na broj zvezdica koje su kliknute
  }

  azurirajCenu(){
    if (!this.rating) {
      this.error='Morate uneti ocenu'
    } else {
      this.servis.azurirajOcenu(this.posao.id,this.rating,this.posao.firma).subscribe(
        poruka=>{
          if(poruka.msg=='ok'){
            this.ngOnInit()
          } else {
            alert('Greska pri azuriranju Ocene')
          }
        }
      )
    }
  }

  azurirajKomentar(){
    if(!this.komentar) {
      this.error='Morate uneti komentar!'
    } else {
      this.servis.azurirajKomentar(this.posao.id,this.komentar,this.posao.firma).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {
          this.ngOnInit()
        } else {
          alert('Neuspesno azuriranje komentara')
        }
      }
      )
    }
  }

}
