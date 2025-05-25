import { Component } from '@angular/core';
import Vlasnik from '../models/vlasnik';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promena-vlasnik',
  templateUrl: './promena-vlasnik.component.html',
  styleUrls: ['./promena-vlasnik.component.css']
})
export class PromenaVlasnikComponent {
  constructor(private servis:UserService,private ruter:Router){}

  vlasnik:Vlasnik=new Vlasnik()

  backendUrl: string = 'http://localhost:4000/';


  dinersRegex = /^(300|301|302|303|36|38)\d{12}$/;

  masterCardRegex = /^(51|52|53|54|55)\d{14}$/;


  visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;

  
  phoneRegex = /^\+3816\d{8}$/; // Broj telefona: +3816 i 8 cifara
  emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  ime:string=''
  prezime:string=''
  broj:string=''
  imejl:string=''
  picture: File | null = null
  kartica:number=0;

  error:string=''

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.picture = file;  // Čuva sliku ako je u pravilnom formatu
    } else {
      alert("Samo JPG/PNG formati su podržani!");
    }
  }

  promeniSliku(){
    const formData = new FormData();
    formData.append('korisnicko_ime',this.vlasnik.korisnicko_ime)
    if(this.picture)
    formData.append('slika',this.picture)
    this.servis.promeniSliku(formData).subscribe(
      poruka=>{
        if(poruka.msg=='ok'){this.ngOnInit()}
        else{
          alert('Nije uspelo azuziranje slike')
        }
      }
    )

  }

  promeniIme(){
    this.error = ''
    if (!this.ime) {
      this.error = 'Morate uneti ime!'
      return
    }
    this.servis.promeniIme(this.vlasnik.korisnicko_ime,this.ime).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {this.ngOnInit()}
        else{ alert('Azuriranje imena nije uspelo')}
      }
    )
  }

  promeniPrezime(){
    this.error=''

    if(!this.prezime){
      this.error='Morate uneti prezime!'
      return
    }
    this.servis.promeniPrezime(this.vlasnik.korisnicko_ime,this.prezime).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {this.ngOnInit()}
        else{ alert('Azuriranje prezimena nije uspelo')}
      }
    )
  }

  promeniMejl(){
    this.error=''

    if(!this.imejl || !this.emailRegex.test(this.imejl)){
      this.error='Niste uneli mejl ili on nije u trazenom formatu'
      return
    }
    this.servis.promeniMejl(this.vlasnik.korisnicko_ime,this.imejl).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {this.ngOnInit()}
        else{ alert('Azuriranje mejla nije uspelo')}
      }
    )
  }

  promeniBroj(){
    this.error=''

    if(!this.broj || !this.phoneRegex.test(this.broj)){
      this.error='Niste uneli broj telefona ili on nije u trazenom formatu'
      return
    }
    this.servis.promeniBroj(this.vlasnik.korisnicko_ime,this.broj).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {this.ngOnInit()}
        else{ alert('Azuriranje broja nije uspelo')}
      }
    )
  }
  

  ngOnInit(): void {
      let naziv=localStorage.getItem('promena-vlasnik')
      naziv=naziv==null?'':naziv
      this.servis.getVlasnik(naziv).subscribe(
        korisnik=>{
          this.vlasnik=korisnik
        }
      )
  }

  getUserImageUrl(imagePath: string): string {
    // Kombinujte osnovni URL sa putanjom iz baze
    return this.backendUrl + imagePath;
  }

  promeniKarticu(){
    let proveraKartice=this.kartica.toString()
    if(!this.dinersRegex.test(proveraKartice) && !this.masterCardRegex.test(proveraKartice) && !this.visaRegex.test(proveraKartice))
    {
      this.error='Broj kartice nije u odgovarajucem formatu!'
      return
    }
    this.servis.promeniKarticu(this.vlasnik.korisnicko_ime,this.kartica).subscribe(
      poruka=>{
        if(poruka.msg=='ok')  {
          this.error=''
          this.ngOnInit()}
        else{ alert('Azuriranje kartice nije uspelo')}
      }
    )
  }

  promeniStatus(korisnicko_ime:string,status:string){
    let salji:string=''
    if(status=='aktivan') salji='neaktivan'
    else salji='aktivan'

    this.servis.promeniStatus(korisnicko_ime,salji).subscribe(
      poruka=>{
        if(poruka.msg=='ok') {
          this.ngOnInit()
        } else {
          alert('Neuspela promena statusa!')
        }
      }
    )

  }
}
