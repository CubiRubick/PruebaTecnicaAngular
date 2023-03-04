import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './components/detail/detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ClienteService } from 'src/services/cliente.service';
import { HttpClientModule } from '@angular/common/http';

const appRoutes:Routes = [
  {path: '', component: ListComponent},
  {path: 'nuevo', component: DetailComponent},
  {path: 'editar', component: DetailComponent},
  {path: 'eliminar', component: DetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    NavbarComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
