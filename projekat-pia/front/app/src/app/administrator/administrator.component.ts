import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit{
   constructor(private http:HttpClient,private servis:UserService,private ruter:Router){}

   korisnicko_ime:string=''
   lozinka:string=''
   error=''

   ngOnInit(): void {
       
   }

   login(){
    if(!this.korisnicko_ime || !this.lozinka) {
      this.error='Niste popunili obavezna polja!'
      return
    }
    this.servis.loginAdministrator(this.korisnicko_ime,this.lozinka).subscribe(
      admin=>{
        if(admin)
        {
          localStorage.setItem('admin',admin.korisnicko_ime)
          this.ruter.navigate(['admin2'])
        } else {
          this.error="Takav korisnik ne postoji u bazi!"
        }
      }
    )
   }
}
