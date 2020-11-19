import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeService } from '../service/employee.service';
import { EmployeeInterface } from '../model/employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from '../service/snack-bar.service';




@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: EmployeeInterface[];
  displayedColumns: string[] = ['name', 'age', 'department', 'bloodGroup', 'address', 'contactNumber', 'edit', 'delete'];
  dataSource = new MatTableDataSource<EmployeeInterface>(this.ELEMENT_DATA);


  emps;
  id;
  emp

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private _Activatedroute: ActivatedRoute,
    private snackbar: SnackBarService
  ) { }


  openDialog() {
    const dialogRef = this.dialog.open(EmployeeAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onDelete(id) {
    for (let i = 0; i < this.emps.length; i++) {
      if (this.emps[i].id == id) {
        this.emps.splice(i, 1);
      }
    }

    this.employeeService.deleteEmployee(id);
    this.snackbar.info("Employee details Deleted!")
    window.location.reload()
  }

  ngOnInit(): void {
    this.emps = this.employeeService.getEmployeeData();
    this.id = this._Activatedroute.snapshot.params['id'];
    this.emp = this.emps.find(p => p.id == this.id);

    this.dataSource.data = this.emps as EmployeeInterface[];

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
