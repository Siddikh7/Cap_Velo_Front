import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';
import { VeloComponent } from '../velo/velo.component';


@Component({
  selector: 'app-tabletest',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css'
})
export class TabletestComponent {

  displayedColumns: string[] = ['nom'];

  dataSource!: MatTableDataSource<VeloModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly veloService: VeloService){}

  ngOnInit(): void {
    this.veloService.showAll().subscribe(value => {
      this.dataSource = new MatTableDataSource<VeloModel>(value);
      this.dataSource.paginator = this.paginator;
    });
  }
}