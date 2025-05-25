import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Posao from '../models/posao';
import Dekorater from '../models/dekorater';

@Component({
  selector: 'app-dekorater-odrzavanja',
  templateUrl: './dekorater-odrzavanja.component.html',
  styleUrls: ['./dekorater-odrzavanja.component.css']
})
export class DekoraterOdrzavanjaComponent implements OnInit {

  constructor(private servis:UserService,private ruter:Router){}


  posloviZahtev:Posao[]=[]

  dekorater:Dekorater=new Dekorater()

  posloviDekorater:Posao[]=[]

  komentar:string=''
  error=''

  picture: File | null = null

  ngOnInit(): void {

    let naziv=localStorage.getItem('ulogovan')
    naziv=naziv==null?'':naziv
    this.servis.getDekorater(naziv).subscribe(
      d=>{
        this.dekorater=d

        this.servis.posloviFirmeZahtev(this.dekorater.firma).subscribe(
          p=>{
            this.posloviZahtev=p
          }
        )

        this.servis.dekoraterPoslovi(this.dekorater.korisnicko_ime).subscribe(
          p=>{
            this.posloviDekorater=p
          }
        )
      }
    )
      
  }

  prihvati(posao:Posao){
    this.servis.checkAktuelniPoslovi(this.dekorater.korisnicko_ime,posao.datumPocetka,posao.datumKraja).subscribe(
      poruka=>{
        if(poruka.msg=='ok'){
          this.servis.dekoraterPrihvatiZahtev(this.dekorater.korisnicko_ime,posao.id).subscribe(
            poruka=>{
              if(poruka.msg=='ok'){
                alert('Uspesno prihvacen posao')
                this.ngOnInit()
              }
              else {
                alert('Doslo je do greske')
              }
            }
          )
        } else {
          alert('Dekorater je zauzet u to vreme!')
        }
      }
    )
   
   
  }

  odbij(posao:Posao){
    if(!this.komentar){
      alert('Morate uneti komentar kod odbijenice')
      return
    }
    this.error=''
    this.servis.dekoraterOdbijZahtev(this.komentar,posao.id).subscribe(
      poruka=>{
        if(poruka.msg=='ok'){
          alert('Uspesno odbijen posao')
          this.ngOnInit()
        }
        else {
          alert('Doslo je do greske')
          

        }
      }
    )
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.picture = file;  // Čuva sliku ako je u pravilnom formatu
    } else {
      alert("Samo JPG/PNG formati su podržani!");
    }
  }
  dodajSliku(p:Posao){
    if(!this.picture){
      alert('Morate dodati sliku!')
      return
    }
    const formData = new FormData();
    formData.append('slika',this.picture)
    formData.append('id',p.id.toString())
    this.servis.dodajSlikuBaste(formData).subscribe(
      poruka=>{
        if(poruka.msg=='ok'){
          alert('Slika je sacuvana!')
          this.ngOnInit()
        } else {
          alert('Doslo je do greske')
        }
      }
    )


  }

}
