import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private http: HttpClient, private ruter: Router, private servis: UserService) { }

  lozinka: string = ''
  staraLozinka: string = ''
  ponovljena: string = ''
  validnastaraLozinka: boolean = false
  validnaLozinka: boolean = false
  validnaPonovljena: boolean = false
  error:string=''
  ime:string=''


  lozinkaRegex = /^(?=[A-Za-z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^\&*\)\(+=._-]).{6,10}$/;

 
    
  proveriLozinku1(){
    this.validnastaraLozinka = this.lozinkaRegex.test(this.staraLozinka)
  }

  proveriLozinku2(){
    this.validnaLozinka = this.lozinkaRegex.test(this.lozinka)
  }

  proveriLozinku3(){
    this.validnaPonovljena = this.lozinkaRegex.test(this.ponovljena)

  }

  changePassword(){
    if(!this.lozinka || !this.staraLozinka || !this.ponovljena || !this.ime){
      this.error='Niste uneli trazene podatke'
      return
    }
    if(!this.lozinkaRegex.test(this.lozinka) || !this.lozinkaRegex.test(this.staraLozinka) || !this.lozinkaRegex.test(this.ponovljena) ) {
      this.error='Morate uneti lozinke u odgovarajucem formatu!'
      return
    }
    if(this.lozinka!=this.ponovljena) {this.error="Nova i ponovljena lozinka nisu iste!"
      return;
    } else{
      this.servis.changePassword(this.lozinka,this.staraLozinka,this.ime).subscribe(
        poruka=>{
          if(poruka.msg=='ok') {this.error="Lozinka je uspesno promenjena!"}
          else {
            if(poruka.msg=='Ne') {this.error='Ne postoji korisnik!!'}
            else {this.error="Doslo je do greske u sistemu prilikom promene lozinke"}
          }
        }
      )
    }
  }

  logout(){
    localStorage.clear
    this.ruter.navigate([''])
  }





}
