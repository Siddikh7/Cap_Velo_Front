import {AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-tabletest',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css'
})
export class TableTestComponent {

  displayedColumns: string[] = ['nom','quantite','description'];

  /*dataSource!: MatTableDataSource<VeloModel>;*/
  dataSource = new MatTableDataSource<VeloModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private veloService: VeloService){}

  ngOnInit(): void {
    this.veloService.showAll().subscribe(value => {
      console.log(value);
      this.dataSource = new MatTableDataSource<VeloModel>(value);
    });
  }
}
