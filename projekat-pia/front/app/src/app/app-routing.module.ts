import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login-vlasnik',component:LoginVlasnikComponent},
  {path:'vlasnik',component:VlasnikComponent},
  {path:'dekorater',component:DekoraterComponent},
  {path:'praviLogin',component:PraviLoginComponent},
  {path:'promena-lozinke',component:PromenaLozinkeComponent},
  {path:'vlasnik',component:VlasnikComponent},
  {path:'administrator',component:AdministratorComponent},
  {path:'admin2',component:Admin2Component},
  {path:'firma',component:FirmaComponent},
  {path:'spiskovi',component:SpiskoviComponent},
  {path:'promena-vlasnik',component:PromenaVlasnikComponent},
  {path:'promena-dekorater',component:PromenaDekoraterComponent},
  {path:'dodavanje-dekoratera',component:DodavanjeDekorateraComponent},
  {path:'firme',component:FirmeComponent},
  {path:'detalji-firme',component:DetaljiFirmeComponent},
  {path:'zakazivanja',component:ZakazivanjaComponent},
  {path:'azuriraj-cena',component:AzurirajCenaComponent},
  {path:'odrzavanje',component:OdrzavanjeComponent},
  {path:'zakazi-odrzavanje',component:ZakaziOdrzavanjeComponent},
  {path:'dekorater-zakazivanja',component:DekoraterZakazivanjaComponent},
  {path:'dekorater-odrzavanja',component:DekoraterOdrzavanjaComponent},
  {path:'dekorater-statistika',component:DekoraterStatistikaComponent}
  

  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
