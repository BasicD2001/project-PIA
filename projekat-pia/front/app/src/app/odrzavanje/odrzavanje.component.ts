import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Route, Router } from '@angular/router';
import Posao from '../models/posao';

@Component({
  selector: 'app-odrzavanje',
  templateUrl: './odrzavanje.component.html',
  styleUrls: ['./odrzavanje.component.css']
})
export class OdrzavanjeComponent  implements OnInit{
  constructor(private servis:UserService,private ruter:Router){}

  zavrseni:Posao[]=[]

  cekaju:Posao[]=[]

  vlasnik:string=''



  ngOnInit(): void {
    let naziv=localStorage.getItem('ulogovan')
    this.vlasnik=naziv==null?'':naziv

    this.servis.getOdrzavanja(this.vlasnik).subscribe(
      o=>{
        o.forEach(element => {
            if(element.datumKraja && element.datumKraja<new Date().toISOString().split('T')[0]){
              this.servis.changeOdrzavanje(element.idPosao).subscribe(
                
              )
            }
            
        });

        this.servis.PosaoZavrsenOdrzavanje(this.vlasnik).subscribe(
          d=>{
            this.zavrseni=d
          }
        )


        this.servis.posaoZahtev(this.vlasnik).subscribe(
          c=>{
            this.cekaju=c

            this.servis.odrzavanje(this.vlasnik).subscribe(
              p=>{
                p.forEach(posao => {
                  this.cekaju.push(posao)
                });
              }
            )
  
          
          }
        )   

      }
    )
    
  }

   isMoreThanSixMonths(dateOdrzavanja:string):boolean {
    if(!dateOdrzavanja) return true
     let danasnjiDatum=new Date().toISOString().split('T')[0]
    const datumOdrzavanja = new Date(dateOdrzavanja);
    const danasnjiDatumObj = new Date(danasnjiDatum);

    // Dodajte 6 meseci na datumOdrzavanja
    const sixMonthsLater = new Date(datumOdrzavanja);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    // Proverite da li je danasnjiDatum kasniji od sixMonthsLater
    return danasnjiDatumObj > sixMonthsLater;
}

  zakazi(posao:Posao){
    localStorage.setItem('brojOdPosla',JSON.stringify(posao))
    this.ruter.navigate(['zakazi-odrzavanje'])
  }
}
