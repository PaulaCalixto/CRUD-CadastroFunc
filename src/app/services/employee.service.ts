import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: any[] = [];
  private totalEmployees: number = 0;

  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3000/employees').pipe(
      tap((employees) => {
        this.employees = employees;
        this.totalEmployees = employees.length;
      })
    );
  }

  getTotalEmployees(): number {
    return this.totalEmployees;
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}

// Para rodar o simulador de servidor JSON no terminal => json-server --watch db.json
