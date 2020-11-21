import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeService } from './service/employee.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from './service/snack-bar.service';
import { LimitTextPipe } from './pipes/limit-text.pipe';
import { EmployeeViewDetailsComponent } from './employee-view-details/employee-view-details.component';

// routes
const routes: Routes = [
  { path: "", component: EmployeeTableComponent },
  { path: "emp-edit/:id", component: EmployeeEditComponent },
  { path: "emp-view/:id", component: EmployeeViewDetailsComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    LimitTextPipe,
    EmployeeViewDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MatDialogModule
  ],

  providers: [EmployeeService, SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
