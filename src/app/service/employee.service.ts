import { Injectable } from '@angular/core';
import { EmployeeInterface } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getEmployeeData() {
    const empdata = JSON.parse(localStorage.getItem('Employees'))
    if (!empdata) {
      return [{ name: "Empty", age: "Empty", department: "Empty", bloodGroup: "Empty", address: ["Empty"], contactNumber: ["Empty"] }]
    }
    return empdata;
  }


  addEmployeeData(employeeData: EmployeeInterface) {
    let allEmployees = [];
    if (localStorage.getItem('Employees')) {
      allEmployees = JSON.parse(localStorage.getItem('Employees'));
      allEmployees = [employeeData, ...allEmployees];
    }
    else {
      allEmployees = [employeeData]
    }
    localStorage.setItem('Employees', JSON.stringify(allEmployees));
  }



  editEmployeeData(updatedEmpData) {

    function removeEmptyValues(actual) {
      let newArray = new Array();
      for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i]);
        }
      }
      return newArray;
    }

    let employeeData = JSON.parse(localStorage.getItem('Employees'));
    for (let i = 0; i < employeeData.length; i++) {
      if (employeeData[i].id == updatedEmpData.id) {
        updatedEmpData.address = removeEmptyValues(updatedEmpData.address);
        updatedEmpData.contactNumber = removeEmptyValues(updatedEmpData.contactNumber)
        employeeData[i] = updatedEmpData;
      }
    }
    localStorage.setItem('Employees', JSON.stringify(employeeData));
  }




  deleteEmployee(id) {
    let employeeData = JSON.parse(localStorage.getItem('Employees'));
    for (let i = 0; i < employeeData.length; i++) {
      if (employeeData[i].id == id) {
        employeeData.splice(i, 1);
      }
    }
    localStorage.setItem('Employees', JSON.stringify(employeeData));
  }



}

