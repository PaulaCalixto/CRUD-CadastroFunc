import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { EmpAddEdtComponent } from './emp-add-edt/emp-add-edt.component';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'crud-app';
  displayedColumns: string[] = [
    'id',
    'nome',
    'sobrenome',
    'email',
    'data',
    'acao',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erro na requisição HTTP:', err);
        alert('Ocorreu um erro ao obter a lista. Por favor, tente novamente mais tarde.');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Deletado!');
        this.getEmployeeList();
      },
      error: (err) => {
        console.error('Erro na requisição HTTP:', err);
        alert('Ocorreu um erro ao excluir o funcionário. Por favor, tente novamente mais tarde.');
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEdtComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }
}
