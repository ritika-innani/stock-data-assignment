import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
    imports: [
      CommonModule,
      MatTableModule,
      MatCardModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatDialogModule,
      MatButtonModule,
      MatInputModule,
      MatSortModule
    ],
    exports: [
      CommonModule,
      MatTableModule,
      MatCardModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatDialogModule,
      MatButtonModule,
      MatInputModule,
      MatSortModule
    ]
})
export class MaterialModule {
}
