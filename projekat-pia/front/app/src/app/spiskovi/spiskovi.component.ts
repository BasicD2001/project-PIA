import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Vlasnik from '../models/vlasnik';
import Dekorater from '../models/dekorater';

@Component({
  selector: 'app-spiskovi',
  templateUrl: './spiskovi.component.html',
  styleUrls: ['./spiskovi.component.css']
})
export class SpiskoviComponent implements OnInit {
  constructor(private servis:UserService,private ruter:Router) {
    
  }

  vlasnici:Vlasnik[]=[]
  dekorateri:Dekorater[]=[]

  ngOnInit(): void {
      this.servis.dohvatiVlasnike().subscribe(
        vlasnik=>{
          this.vlasnici=vlasnik
        }
      )

      this.servis.dohvatiDekoratere().subscribe(
        dekor=>{
          this.dekorateri=dekor
        }
      )
  }

  azurirajVlasnika(korisnicko_ime:string){
      localStorage.setItem('promena-vlasnik',korisnicko_ime)
      this.ruter.navigate(['promena-vlasnik'])
  }

  azurirajDekoratera(korisnicko_ime:string){
    localStorage.setItem('promena-dekorater',korisnicko_ime)
    this.ruter.navigate(['promena-dekorater'])
  }
}
