import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pravi-login',
  templateUrl: './pravi-login.component.html',
  styleUrls: ['./pravi-login.component.css']
})
export class PraviLoginComponent implements OnInit {


  constructor(private http:HttpClient,private servis:UserService,private ruter:Router){}

  ngOnInit(): void {
    this.servis.getUsers().subscribe(
      imena => {
        this.korisnickaImena = imena
      }
    )
  }

  korisnicko_ime:string=''
  lozinka:string=''
  korisnickaImena:string[]=[]
  poruka:string=''
  error:string=''

  login(){
    if(!this.korisnicko_ime || !this.lozinka) {
      this.error='Niste uneli potrebne podatke'
      return
    }
    this.servis.loginVlasnik(this.korisnicko_ime,this.lozinka).subscribe(
      korisnik=>{
        if(korisnik){
          let naziv=korisnik.korisnicko_ime
          naziv=naziv==null?'':naziv
          localStorage.setItem('ulogovan',naziv)
          this.ruter.navigate(['vlasnik'])
         
        }
        else {
          this.servis.loginDekorater(this.korisnicko_ime,this.lozinka).subscribe(
            dekorater=>{
              if(dekorater) {
                let naziv=dekorater.korisnicko_ime
                naziv=naziv==null?'':naziv
                localStorage.setItem('ulogovan',naziv)
                this.ruter.navigate(['dekorater'])
              }
              else{
                this.error="Korisnik ne postoji u bazi,nije prihvacen ili je deaktiviran!"
              }
              

            }
          )
        }
      }

    )
  }


  logout(){
    localStorage.clear()
    this.ruter.navigate([''])
  }

  

}
