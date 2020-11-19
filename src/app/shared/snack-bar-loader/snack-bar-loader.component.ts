import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-loader',
  templateUrl: './snack-bar-loader.component.html',
  styleUrls: ['./snack-bar-loader.component.css']
})
export class SnackBarLoaderComponent implements OnInit {

  loading: boolean = false;
  constructor(
    private ref: MatSnackBarRef<SnackBarLoaderComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) { }

  ngOnInit() {
    this.ref.afterOpened().subscribe(() => { this.loading = true });
    this.ref.afterDismissed().subscribe(() => { this.loading = false });
  }

}
