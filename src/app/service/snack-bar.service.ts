import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarLoaderComponent } from '../shared/snack-bar-loader/snack-bar-loader.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  info(message, action = 'Close') {                   //snackbar info function
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar', 'info']
    });
  }

  error(message, action = 'Close') {                //snackbar err function
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', 'danger']
    });
  }

  retryLoader(): MatSnackBarRef<SnackBarLoaderComponent> {
    return this.snackBar.openFromComponent(SnackBarLoaderComponent, {
      panelClass: 'loader',
      horizontalPosition: "right",
      verticalPosition: "top",
      data: 'Lost Connection, Retrying'
    });
  }

}
