import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edt',
  templateUrl: './emp-add-edt.component.html',
  styleUrls: ['./emp-add-edt.component.scss']
})
export class EmpAddEdtComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEdtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      data: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue({
      ...this.data,
      data: this.data?.data ? this.formatDate(this.data.data) : '',
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Funcionário atualizado com sucesso');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Funcionário adicionado com sucesso');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

  private formatDate(date: string): string {
    const parts = date.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
}
