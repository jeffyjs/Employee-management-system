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
    age: new FormControl(null, [Validators.required]),
    department: new FormControl(null, [Validators.required]),
    bloodGroup: new FormControl(null, [Validators.required]),
    address: new FormArray([]),
    contactNumber: new FormArray([])
  })

  employeeData: EmployeeInterface;

  bg: bloodGroup[] = [
    {value: 'A +', viewValue: 'A +'},
    {value: 'A -', viewValue: 'A -'},
    {value: 'B +', viewValue: 'B +'},
    {value: 'B -', viewValue: 'B -'},
    {value: 'AB +', viewValue: 'AB +'},
    {value: 'AB -', viewValue: 'AB -'},
    {value: 'O +', viewValue: 'O +'},
    {value: 'O -', viewValue: 'O -'},

  ];
  

  constructor(
    private employeeService:EmployeeService,
    private router:Router,
    private snackbar:SnackBarService
    ) { }




  employeeSet():EmployeeInterface{
    return this.employeeData = {
      name:this.name.value,
      age:this.age.value,
      department:this.department.value,
      bloodGroup:this.bloodGroup.value,
      address:this.address.value,
      contactNumber:this.contactNumber.value,
      id:generateUUID()
    }
  }

  get name(){
    return this.employeeAddForm.get('name') as FormControl
  }
  get age(){
    return this.employeeAddForm.get('age') as FormControl
  }
  get department(){
    return this.employeeAddForm.get('department') as FormControl
  }
  get bloodGroup(){
    return this.employeeAddForm.get('bloodGroup') as FormControl
  }
  get address(){
    return this.employeeAddForm.get('address') as FormArray
  }
  get contactNumber(){
    return this.employeeAddForm.get('contactNumber') as FormArray
  }

  // addEmployeeData(employeeData){
  //   let allEmployees = [];
  //   if(localStorage.getItem('Employees')){
  //     allEmployees = JSON.parse(localStorage.getItem('Employees'));
  //     allEmployees = [employeeData, ...allEmployees];
  //   }
  //   else{
  //     allEmployees = [employeeData]
  //   }
  //   localStorage.setItem('Employees', JSON.stringify (allEmployees))
  // }



  onAddNumber(){
    // const controls = new FormControl(null);
    (<FormArray>this.employeeAddForm.get('contactNumber')).push(new FormControl(''));
   
  }

  onAddAddress(){
    // const controlsAddress = new FormControl(null);
    // (<FormArray>this.employeeAddForm.get('address')).push(controlsAddress)
    (<FormArray>this.employeeAddForm.get('address')).push(new FormControl(''));
  }


  ngOnInit(){
    this.emps = this.employeeService.getEmployeeData();

  }

  onSubmit(){
   
    console.log(this.employeeAddForm.getRawValue());

    if(this.employeeAddForm.valid){
      //this.employeeData = Object.assign(this.employeeData, this.employeeAddForm.value);
      // localStorage.setItem('Employee', JSON.stringify (this.employeeData))
      this.employeeService.addEmployeeData(this.employeeSet());  //this.employeeData
      // this.employeeAddForm.reset();
      this.snackbar.info("Employee Addes!")
      window.location.reload()
    }
  }

}
