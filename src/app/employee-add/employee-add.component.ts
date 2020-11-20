import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeInterface } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import generateUUID from 'smc-uuid-generator';
import { SnackBarService } from '../service/snack-bar.service';

interface bloodGroup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  emps;

  employeeAddForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required,Validators.maxLength(2)]),
    department: new FormControl(null, [Validators.required]),
    bloodGroup: new FormControl(null, [Validators.required]),
    address: new FormArray([
      new FormControl('', [Validators.required])
    ]),
    contactNumber: new FormArray([
      new FormControl('', [Validators.required])
    ])
  })

  employeeData: EmployeeInterface;

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


  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackbar: SnackBarService
  ) { }




  employeeSet(): EmployeeInterface {
    return this.employeeData = {
      name: this.name.value,
      age: this.age.value,
      department: this.department.value,
      bloodGroup: this.bloodGroup.value,
      address: this.address.value,
      contactNumber: this.contactNumber.value,
      id: generateUUID()
    }
  }

  get name() {
    return this.employeeAddForm.get('name') as FormControl
  }
  get age() {
    return this.employeeAddForm.get('age') as FormControl
  }
  get department() {
    return this.employeeAddForm.get('department') as FormControl
  }
  get bloodGroup() {
    return this.employeeAddForm.get('bloodGroup') as FormControl
  }
  get address() {
    return this.employeeAddForm.get('address') as FormArray
  }
  get contactNumber() {
    return this.employeeAddForm.get('contactNumber') as FormArray
  }



  onAddNumber() {
    (<FormArray>this.employeeAddForm.get('contactNumber')).push(new FormControl(''));
  }

  onAddAddress() {
    (<FormArray>this.employeeAddForm.get('address')).push(new FormControl(''));
  }


  ngOnInit() {
    this.emps = this.employeeService.getEmployeeData();
  }

  onSubmit() {
    if (this.employeeAddForm.valid) {
      this.employeeService.addEmployeeData(this.employeeSet());
      this.snackbar.info("Employee Added!")
      window.location.reload()
    }
  }

  

}
