import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Vlasnik from '../models/vlasnik';

@Component({
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {

  constructor(private servis:UserService,private ruter:Router){}

  vlasnici:Vlasnik[]=[]

  ngOnInit(): void {
      this.servis.zahteviObrada().subscribe(
        v=>{
          this.vlasnici=v
        }
      )
  }

  prihvati(korisnicko_ime:string){
    this.servis.prihvatiZahtev(korisnicko_ime).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {this.ngOnInit()}
        else {
          alert('Neuspesno prihvatanje zahteva')
        }
      }
    )
  }

  odbij(korisnicko_ime:string){

    this.servis.odbijZahtev(korisnicko_ime).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {this.ngOnInit()}
        else {alert('Neuspeno odbijanje zahteva')}
      }
    )

  }


}
