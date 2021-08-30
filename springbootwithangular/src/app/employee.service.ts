import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';

//można wstrzyknąć zależność przy pomocu @Injectable lub w zakładce app.module.ts wpisuje "providers: [EmployeeService]"
@Injectable({providedIn: 'root'})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //metoda, która pobiera dane (w tym wypadku dane pracowników) i tworzy z nich listę przygotowaną do wyświetlenia
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);//znak "`" to nie pojedyńczy apostrof tylko gravis(przy tyldzie)
    //inaczej zwany w programowaniu backticks lub backquotes(czyli komenda zawarta między backticks'ami zostanie wykonana)
  }

  //metoda dodająca pracownika do bazy
  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  //metoda uaktualnia(nadpisuje) dane 
  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  //metoda usuwająca pracownika
  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
