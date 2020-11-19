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



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA:EmployeeInterface[];
 displayedColumns: string[] = ['name', 'age', 'department', 'bloodGroup','address','contactNumber','edit','delete'];
 dataSource = new MatTableDataSource<EmployeeInterface>(this.ELEMENT_DATA);
  // data:EmployeeInterface[]=[]
  
emps;
id;
emp

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private employeeService:EmployeeService,
    private _Activatedroute:ActivatedRoute,
    private snackbar:SnackBarService
    ) {}

    
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
    for(let i = 0; i < this.emps.length; i++) {
      if(this.emps[i].id == id) {
          this.emps.splice(i, 1);
      }
    }

    this.employeeService.deleteEmployee(id);
    this.snackbar.info("Employee details Deleted!")
    window.location.reload()
  }

  ngOnInit(): void {
   this.emps = this.employeeService.getEmployeeData();
    console.log(this.emps);

    this.id=this._Activatedroute.snapshot.params['id'];
    this.emp=this.emps.find(p => p.id==this.id);

    this.dataSource.data = this.emps as EmployeeInterface[];
    console.log(this.dataSource);
  }

  //  doFilter(value: string) {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
