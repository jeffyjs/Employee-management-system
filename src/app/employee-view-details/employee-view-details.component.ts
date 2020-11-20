import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-view-details',
  templateUrl: './employee-view-details.component.html',
  styleUrls: ['./employee-view-details.component.css']
})
export class EmployeeViewDetailsComponent implements OnInit {
  emps;
  emp
  id;

  constructor(private employeeService:EmployeeService, 
       private _Activatedroute: ActivatedRoute,) { }

  ngOnInit(){
    this.id = this._Activatedroute.snapshot.params['id'];
    this.emps = this.employeeService.getEmployeeData();
    this.emp = this.emps.find(res => res.id == this.id)
  }

}
