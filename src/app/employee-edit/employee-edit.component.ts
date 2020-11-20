import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { EmployeeInterface } from '../model/employee';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import generateUUID from 'smc-uuid-generator';
import { SnackBarService } from '../service/snack-bar.service';


interface bloodGroup {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  emps;
  emp
  id;
  @ViewChild("f") form: any;

  bg: bloodGroup[] = [
    { value: 'A +', viewValue: 'A +' },
    { value: 'A -', viewValue: 'A -' },
    { value: 'B +', viewValue: 'B +' },
    { value: 'B -', viewValue: 'B -' },
    { value: 'AB +', viewValue: 'AB +' },
    { value: 'AB -', viewValue: 'AB -' },
    { value: 'O +', viewValue: 'O +' },
    { value: 'O -', viewValue: 'O -' },

  ];

  employeeData: EmployeeInterface;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private snackbar: SnackBarService
  ) { }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.params['id'];
    // console.log(this.id)
    this.emps = this.employeeService.getEmployeeData();
    this.emp = this.emps.find(res => res.id == this.id)

  }

  

  onSubmit() {

    if (this.form.value) {
      this.employeeService.editEmployeeData(this.emp);
      this.snackbar.info("Successfully edited!")
      this.router.navigate(['/']);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }



}
