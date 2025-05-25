import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Firma } from '../models/firma';
import Dekorater from '../models/dekorater';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servis:UserService,private ruter:Router){}

  dekorisaneBaste:number=0
  vlasnici:number=0
  dekorateri:number=0
  poslovi24:number=0
  poslovi7:number=0
  poslovi30:number=0
  firme:Firma[]=[]
  slike:string[]=[]
  dekorateri2:Dekorater[]=[]
  backendUrl: string = 'http://localhost:4000/';




  selectedSortOption:string=''
  searchName:string=''
  searchAddress:string=''
  rastuce:boolean=false;
  opadajuce:boolean=false;
  rastuceAdr:boolean=false;
  opadajuceAdr:boolean=false;

  pretragaNaziv:boolean=false;
  pretragaAdresa:boolean=false;
  pretragaOba:boolean=false;





  sortirajRastucePoNazivu() {
    this.firme.sort((a, b) => b.naziv.localeCompare(a.naziv));
  }

  sortirajOpadajucePoNazivu() {
    this.firme.sort((a, b) => a.naziv.localeCompare(b.naziv));
  }

  sortirajRastucePoAdresi(){
    this.firme.sort((a,b)=>b.adresa.localeCompare(a.adresa))
  }

  sortirajOpadajucePoAdresi(){
    this.firme.sort((a,b)=>a.adresa.localeCompare(b.adresa))
  }

  pretraziNaziv() {
    this.firme = this.firme.filter(firma =>
      firma.naziv.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
  
  pretraziAdresa() {
    this.firme = this.firme.filter(firma =>
      firma.adresa.toLowerCase().includes(this.searchAddress.toLowerCase())
    );
  }
  
  pretraziOba() {
    this.firme = this.firme.filter(firma =>
      firma.naziv.toLowerCase().includes(this.searchName.toLowerCase()) &&
      firma.adresa.toLowerCase().includes(this.searchAddress.toLowerCase())
    );
  }

  rastuceSort(){
    this.rastuce=true
    this.ngOnInit()
  }

  opadajuceSort(){
    this.opadajuce=true
    this.ngOnInit()
  }

  rastuceSortAdr(){
    this.rastuceAdr=true
    this.ngOnInit()
  }

  opadajuceSortAdr(){
    this.opadajuceAdr=true
    this.ngOnInit()
  }

  searchIme(){
    this.pretragaNaziv=true
    this.ngOnInit()
  }

  searchAdresa(){
    this.pretragaAdresa=true
    this.ngOnInit()
  }

  searchOba(){
    this.pretragaOba=true
    this.ngOnInit()
  }

  sortiraj(){
    if(!this.selectedSortOption) return
    if(this.selectedSortOption=='asc') {
      this.rastuceSort()
      return; }

    if(this.selectedSortOption=='desc') {
      this.opadajuceSort()
      return
    } 
    if(this.selectedSortOption=='ascAdr'){
      this.rastuceSortAdr()
      return
    }
    if(this.selectedSortOption=='descAdr'){
      this.opadajuceSortAdr()
      return
    }
  
  }

  restartuj(){
    this.ngOnInit()
  }
    
  
  pretrazi(){
    if(this.searchAddress && this.searchName) {
      this.searchOba()
      return
    }
    if(this.searchAddress) {
      this.searchAdresa()
      return
    }
    if(this.searchName) {
      this.searchIme()
    }
  }














  ngOnInit(): void {
      this.servis.pocetnaBrojBasta().subscribe(
        b=>{
          this.dekorisaneBaste=b
        }
      )

      this.servis.pocetnaBrojDekoratera().subscribe(
        b=>{
          this.dekorateri=b
        }
      )

      this.servis.pocetnaBrojVlasnika().subscribe(
        b=>{
          this.vlasnici=b
        }
      )

      this.servis.zakazaniPoslovi7().subscribe(
        p=>{
          this.poslovi7=p
        }
      )

      this.servis.zakazaniPoslovi24().subscribe(
        p=>{
          this.poslovi24=p
        }
      )

      this.servis.zakazaniPoslovi30().subscribe(
        p=>{
          this.poslovi30=p
        }
      )
      this.servis.dohvatiFirme().subscribe(
        f=>{
          this.firme=f
          if(this.rastuce) {
            this.sortirajRastucePoNazivu()
            this.rastuce=false
          }
          if(this.opadajuce){
            this.sortirajOpadajucePoNazivu()
            this.opadajuce=false
          }
          if(this.rastuceAdr){
            this.sortirajRastucePoAdresi()
            this.rastuceAdr=false
          }
          if(this.opadajuceAdr){
            this.sortirajOpadajucePoAdresi()
            this.opadajuceAdr=false
          }
          if(this.pretragaOba){
            this.pretraziOba()
            this.pretragaOba=false
          }
          if(this.pretragaNaziv){
            this.pretraziNaziv()
            this.pretragaNaziv=false
          }
          if(this.pretragaAdresa){
            this.pretraziAdresa()
            this.pretragaAdresa=false
          }

          this.servis.homeUpdate().subscribe(
            poruka=>{
              if(poruka.msg=='ok'){
                this.servis.updateDekoraterStatus().subscribe(
                  
                )
              }
            }
          )
        }
      )

      this.servis.dohvatiDekoratere().subscribe(
        d=>{
          this.dekorateri2=d
        }
      )

      this.servis.poslednjeSlike().subscribe(
        d=>{
          this.slike=d
        }
      )
  }

  getUserImageUrl(imagePath: string): string {
    return this.backendUrl + imagePath;
  }

}
