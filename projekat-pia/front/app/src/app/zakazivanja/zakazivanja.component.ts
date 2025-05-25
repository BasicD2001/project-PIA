import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Posao from '../models/posao';

@Component({
  selector: 'app-zakazivanja',
  templateUrl: './zakazivanja.component.html',
  styleUrls: ['./zakazivanja.component.css']
})
export class ZakazivanjaComponent implements OnInit {

  constructor(private servis:UserService,private ruter:Router){
   
  }

  ngOnInit(): void {
    let naziv=localStorage.getItem('ulogovan')
    this.vlasnik=naziv==null?'':naziv
    this.servis.PosaoAktuelno(this.vlasnik).subscribe(
      poslovi=>{
        this.aktuelni=poslovi
      }
    )

    this.servis.PosaoZavrseno(this.vlasnik).subscribe(
      poslovi=>{
        this.zavrseni=poslovi
      }
    )
  }

  aktuelni:Posao[]=[]
  zavrseni:Posao[]=[]
  finish:string=''
  vlasnik:string=''

  azuriraj(id:number){
    localStorage.setItem('id',id.toString())
    this.ruter.navigate(['azuriraj-cena'])
  }

  danasnjiDatum():string{
    return new Date().toISOString().split('T')[0]
  }

  otkazi(posao:Posao){
    this.servis.deletePosao(posao.id).subscribe(
      poruka=>{
        if(poruka.msg=='ok'){
          this.ngOnInit()
        } else {
          alert('Doslo je do greske')
        }
      }
    )
  }

}
