import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInterface } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( ) { }

  addEmployeeData(employeeData : EmployeeInterface){
    let allEmployees = [];
    if(localStorage.getItem('Employees')){
      allEmployees = JSON.parse(localStorage.getItem('Employees'));
      allEmployees = [employeeData, ...allEmployees];
    }
    else{
      allEmployees = [employeeData]
    }
    localStorage.setItem('Employees', JSON.stringify (allEmployees));
    
  }


 
   editEmployeeData(oldEmp){  let emps = JSON.parse(localStorage.getItem('Employees'));
    for(let i = 0; i < emps.length; i++) {
     if(emps[i].id == oldEmp.id) {
       emps[i] = oldEmp;
       console.log("from service",oldEmp)
     }
  }
     localStorage.setItem('Employees', JSON.stringify(emps));
  }

  

  deleteEmployee(id) {
    let emps = JSON.parse(localStorage.getItem('Employees'));
    for(let i = 0; i < emps.length; i++) {
     if(emps[i].id == id) {
       emps.splice(i, 1);
     }
  }
     localStorage.setItem('Employees', JSON.stringify(emps));
  }

  getEmployeeData(){
    const empdata = JSON.parse(localStorage.getItem('Employees'))
    return empdata;
  }

}

