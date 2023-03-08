import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ClienteService } from 'src/services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './components/update/update.component';

const appRoutes:Routes = [
  {path: '', component: ListComponent},
  {path: 'nuevo', component: AddComponent},
  {path: 'editar/:id', component: UpdateComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    NavbarComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
