import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { EmployeeInterface } from '../model/employee';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import generateUUID from 'smc-uuid-generator';
import { SnackBarService } from '../service/snack-bar.service';

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


  employeeData: EmployeeInterface;
  constructor( 
    private employeeService:EmployeeService,
    private router:Router,
   private _Activatedroute:ActivatedRoute,
   private snackbar:SnackBarService
    ) { }

  ngOnInit(){
    this.id = this._Activatedroute.snapshot.params['id'];
    console.log(this.id)
    this.emps = this.employeeService.getEmployeeData();
    this.emp = this.emps.find(res => res.id == this.id)
    console.log("Edit", this.emp)


  }

  onSubmit(){

    if(this.form.value){
      console.log(this.form.value);
      console.log(this.emp);
      //this.employeeData = Object.assign(this.employeeData, this.employeeAddForm.value);
      // localStorage.setItem('Employee', JSON.stringify (this.employeeData))
      this.employeeService.editEmployeeData(this.emp);  //this.employeeData
      // this.employeeEditForm.reset();
      this.snackbar.info("Successfully edited!")
      // this.router.navigate(['/ems']);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  updateInput(obj1,event){
    this.emp[event.target.name][obj1] = event.target.value;
    console.log(obj1)
  }

}
