import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetRecoveryToken } from './components/support/RecoveryCode/get-recovery-code.component';
import { FilterUserManager } from './components/support/UserManager/user-manager-component';

@NgModule({
  declarations: [
    AppComponent,
    GetRecoveryToken,
    FilterUserManager,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
