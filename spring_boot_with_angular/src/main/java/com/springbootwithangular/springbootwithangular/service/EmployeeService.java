package com.springbootwithangular.springbootwithangular.service;

import com.springbootwithangular.springbootwithangular.exception.UserNotFoundException;
import com.springbootwithangular.springbootwithangular.model.Employee;
import com.springbootwithangular.springbootwithangular.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
//Nie chciało działać mi usuwanie pracowników na poziomie intellij'eja( i postman'a),
// musiałem do dadać adnotację @Transactional, która rozwiązała problem
@Transactional
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    //metoda dodająca pracownika
    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    //metoda wypisująca listę wszystkich pracowników
    public List<Employee> findAllEmployees() {
        return employeeRepo.findAll();
    }

    //metoda aktualizująca pracownika
    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    //metoda znajdująca pracownika
    public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id)
                //jeśli wyszukiwanie nie powiedzie się po id, zostanie wyświetlony wyjątek z wiadomością
                //normalnie nie ma takiego wyjątku jak 'UserNotFoundException' więc stworzyłem klasę w nowym pakiecie, żeby go obsłużyć
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    //metoda usuwająca pracownika
    public void deleteEmployee(Long id) {
        employeeRepo.deleteEmployeeById(id);
    }
}
