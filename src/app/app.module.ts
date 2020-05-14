import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';

import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { FormsModule } from '@angular/forms';
import { SlotsManagementModule } from './slots-management/slots-management.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    SlotsManagementModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch:'full' },
      { path: '', component: LoginComponent },
      { path: '*', component: LoginComponent},
      { path: '**', component: LoginComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
