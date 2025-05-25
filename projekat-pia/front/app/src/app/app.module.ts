import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginVlasnikComponent } from './login-vlasnik/login-vlasnik.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { DekoraterComponent } from './dekorater/dekorater.component';
import { PraviLoginComponent } from './pravi-login/pravi-login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { Admin2Component } from './admin2/admin2.component';
import { FirmaComponent } from './firma/firma.component';
import { SpiskoviComponent } from './spiskovi/spiskovi.component';
import { PromenaVlasnikComponent } from './promena-vlasnik/promena-vlasnik.component';
import { PromenaDekoraterComponent } from './promena-dekorater/promena-dekorater.component';
import { DodavanjeDekorateraComponent } from './dodavanje-dekoratera/dodavanje-dekoratera.component';
import { FirmeComponent } from './firme/firme.component';
import { DetaljiFirmeComponent } from './detalji-firme/detalji-firme.component';
import { ZakazivanjaComponent } from './zakazivanja/zakazivanja.component';
import { AzurirajCenaComponent } from './azuriraj-cena/azuriraj-cena.component';
import { OdrzavanjeComponent } from './odrzavanje/odrzavanje.component';
import { ZakaziOdrzavanjeComponent } from './zakazi-odrzavanje/zakazi-odrzavanje.component';
import { DekoraterZakazivanjaComponent } from './dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterOdrzavanjaComponent } from './dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterStatistikaComponent } from './dekorater-statistika/dekorater-statistika.component';




@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
         LoginVlasnikComponent,
         VlasnikComponent,
         DekoraterComponent,
         PraviLoginComponent,
         PromenaLozinkeComponent,
         AdministratorComponent,
         Admin2Component,
         FirmaComponent,
         SpiskoviComponent,
         PromenaVlasnikComponent,
         PromenaDekoraterComponent,
         DodavanjeDekorateraComponent,
         FirmeComponent,
         DetaljiFirmeComponent,
         ZakazivanjaComponent,
         AzurirajCenaComponent,
         OdrzavanjeComponent,
         ZakaziOdrzavanjeComponent,
         DekoraterZakazivanjaComponent,
         DekoraterOdrzavanjaComponent,
         DekoraterStatistikaComponent,
         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
