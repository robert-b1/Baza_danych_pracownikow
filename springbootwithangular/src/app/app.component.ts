import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  public employees!: Employee[];
  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
  }

  // metoda pobierająca i tworząca listę wszystkich pracowników 
  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //metoda obsługująca przycisk AddEmployee
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')!.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      //jeśli pobieranie danych przebiegnie prawidłowo, lista pracowników zostanie wyświetlona 
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();//ta linijka powoduje, że karta do dawania nowych pracowników jest pusta po otwarciu, gdyż 
        //bez niej są w nią wpisane dane ostatnio dodawanego pracownika
      },
      //jeśli jednak coś pójdzie nie tak to zostanie wyświetlony błąd z wiadomością
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset;//ta linijka powoduje, że karta do dawania nowych pracowników jest pusta po otwarciu, gdyż 
        //bez niej są w nią wpisane dane ostatnio dodawanego pracownika
      }
    );
  }

  //metoda obsługująca przycisk edytowania pracownika
  public onUpdateEmployee(employee: Employee): void{
    this.employeeService.updateEmployee(employee).subscribe(
      //jeśli pobieranie danych przebiegnie prawidłowo, lista pracowników zostanie wyświetlona 
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      //jeśli jednak coś pujdzie nie tak to zostanie wyświetlony błąd z wiadomością
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //metoda do obsługiwania przycisku delete 
  public onDeleteEmployee(employeeId: number): void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //metoda do obsługi okna szukania/lupki
  //szukanie odbędzie się po nazwisku, emailu, nr. tel i po nazwie zatrudnienia
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees){
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  //metoda służąca do tworzenia dodatkowego okna/guzika, ktróra uruchomi się po wciśnięciu np. Add Employee, Edit, Delete
  //"mode" jest parametrem wejścia, dzięki któremu metoda otworzy odpowiednie okno oczekiwane przez urzytkownika(np.
  //gdy urzytkownik wybierze Edit otworzy się okno do edycji danych danego pracownika, itp.) 
  public onOpenModal(employee: Employee, mode: string): void{
    //otwiera bezpośredni dostęp do div'a z oknem poszczególnego pracownika
    const container = document.getElementById('main-container');
    //utworzenie guzika w oknie
    const button = document.createElement('button');
    //zmiana typu button'a(czyli po wciśnięci Edit, przeniesie do okna z edycją)
    button.type = 'button';
    //żeby w nowym oknie nie wyświetliło guzika, trzeba nadać mu styl "none", czyli niewidoczy (ta metoda ma obsłużyć kilka guzików wię nie jest potrzeby jeden konkretny)
    button.style.display = 'none';
    //nadanie atrybutu guzikowi, w tym przypadku przekierowanie do odpowiedniego okna
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container!.appendChild(button);
    button.click();
  }


}
