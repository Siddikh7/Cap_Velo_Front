import {AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';
import { ChangeDetectorRef } from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton} from "@angular/material/button";


@Component({
  selector: 'app-tabletest',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatDivider, MatButton, MatAnchor],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css'
})
export class TableTestComponent {

  displayedColumns: string[] = ['nom','quantite','description','pointgeo','actions'];

  /*dataSource!: MatTableDataSource<VeloModel>;*/
  dataSource = new MatTableDataSource<VeloModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private veloService: VeloService){}

  ngOnInit(): void {
    this.veloService.showAll().subscribe(value => {
      console.log(value);
      this.dataSource = new MatTableDataSource<VeloModel>(value);
      this.dataSource.paginator = this.paginator;
    });
  }
  onEdit(element: VeloModel): void {
    console.log('modifier', element);
    //flm
  }

  onDelete(element: VeloModel): void {
    console.log('modifier', element)
  }
}
