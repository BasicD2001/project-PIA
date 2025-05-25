import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-vlasnik',
  templateUrl: './login-vlasnik.component.html',
  styleUrls: ['./login-vlasnik.component.css']
})
export class LoginVlasnikComponent implements OnInit {

  constructor(private http: HttpClient, private servis: UserService, private router: Router) { }

  ngOnInit(): void {
    this.prazno=''
    this.servis.getUsers().subscribe(
      imena => {
        this.korisnickaImena = imena
      }
    )
    this.servis.getEmails().subscribe(
      niz=>{
        this.mejlovi=niz
      }
    )
  }

  


  korisnicko_ime: string = ''
  lozinka: string = ''
  ime: string = ''
  prezime: string = ''
  pol: string = ''
  adresa: string = ''
  kontakt_telefon: string = ''
  broj_kreditne_kartice: number = 0
  slika: string = ''
  status: string = 'aktivan'
  prazno: string = ''
  validnaLozinka: boolean = true;
  karticaIkonica: string = '';
  regex: boolean = false
  picture: File | null = null
  korisnickaImena: string[] = []
  imejl:string=''
  mejlovi:string[]=[]


  dinersRegex = /^(300|301|302|303|36|38)\d{12}$/;

  masterCardRegex = /^(51|52|53|54|55)\d{14}$/;


  visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;



  lozinkaRegex = /^(?=[A-Za-z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^\&*\)\(+=._-]).{6,10}$/;


   phoneRegex = /^\+3816\d{8}$/; // Broj telefona: +3816 i 8 cifara
  emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; 


  saveVlasnik() {
    this.prazno=''
    if (!this.korisnicko_ime || !this.lozinka || !this.ime || !this.prezime || !this.pol || !this.adresa || !this.kontakt_telefon
      || !this.broj_kreditne_kartice || !this.status ||!this.imejl
    ) {
      this.prazno = "Niste uneli sva polja!"
      return
    }
    if (this.korisnickaImena.includes(this.korisnicko_ime)) {
      this.prazno = "Korisnicko ima je zauzeto!"
      return
    }
    if(this.mejlovi.includes(this.imejl)){
      this.prazno="Imejl adresa je zauzeta!"
      return
    }

    if (!this.validnaLozinka || this.karticaIkonica == '') return

    if(!this.emailRegex.test(this.imejl)){
      this.prazno='Imejl nije u odgovarajucoj formi!'
      return
    }

    if(!this.phoneRegex.test(this.kontakt_telefon)){
      this.prazno='Broj telefona nije u odgovarajucem formatu!'
      return
    }

    // this.servis.saveVlasnik(this.korisnicko_ime,this.lozinka,this.ime,this.prezime,
    //   this.pol,this.adresa,this.kontakt_telefon,this.slika,this.broj_kreditne_kartice,this.status
    // ).subscribe(
    //   poruka=>{
    //     if(poruka.msg!='ok') {alert("Vlasnik je sacuvan u bazi")}
    //   }
    // )

    const formData = new FormData();
    formData.append('korisnicko_ime', this.korisnicko_ime);
    formData.append('lozinka', this.lozinka);
    formData.append('ime', this.ime);
    formData.append('prezime', this.prezime);
    if (this.picture)
      formData.append('slika', this.picture);
    formData.append('pol', this.pol)
    formData.append('adresa', this.adresa)
    formData.append('kontakt_telefon', this.kontakt_telefon)
    formData.append('status', this.status)
    formData.append('imejl',this.imejl)
    formData.append('kartica',this.broj_kreditne_kartice.toString())
    this.servis.saveVlasnik(formData).subscribe(
      poruka => {
        if (poruka.msg == 'ok') { alert("Vlasnik je sacuvan u bazi") 
         
          this.ngOnInit() }
      }
    )

  }

  proveriLozinku() {
    // Провера да ли унети текст у пољу за лозинку одговара регексу
    this.validnaLozinka = this.lozinkaRegex.test(this.lozinka);
  }

 


  proveriKarticu(brojK: number) {
    let brojKartice = brojK.toString()
    if (this.dinersRegex.test(brojKartice)) {
      this.karticaIkonica = 'assets/kartice/dina.jpeg';
    } else if (this.masterCardRegex.test(brojKartice)) {
      this.karticaIkonica = 'assets/kartice/master.png';
    } else if (this.visaRegex.test(brojKartice)) {
      this.karticaIkonica = 'assets/kartice/visa.png';
    } else {
      this.karticaIkonica = ''; // Ако није важећа картица
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      this.picture = file;  // Čuva sliku ako je u pravilnom formatu
    } else {
      alert("Samo JPG/PNG formati su podržani!");
    }
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
