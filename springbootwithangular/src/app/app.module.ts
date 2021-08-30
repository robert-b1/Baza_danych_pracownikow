import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule
  ],
  //"rejestrujemy dostawcę" czyli podaje miejsce konfiguracji serwisu(w tym przypadku 
  //połączenie z hostem 8080) żeby było wiadomo skąd pobrac dane(tutaj dzięki apiServerUrl = environment.apiBaseUrl, 
  //który znajduje się w pliku employee.service.ts )
  //za pomocą providers: [EmployeeService] lub w pliku employee.service.ts trzeba 
  //dodać właściwość(dekorator) @Injectable({providedIn: 'root'})
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
