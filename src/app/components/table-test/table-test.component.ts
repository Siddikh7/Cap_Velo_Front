import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
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
export class TableTestComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nom', 'quantite', 'description', 'pointgeo'];
  dataSource = new MatTableDataSource<VeloModel>();
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cdr: ChangeDetectorRef, private veloService: VeloService) {}

  ngOnInit(): void {
    this.loadVeloData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); // Détecter les changements après l'initialisation du paginator pour résoudre l'erreur
  }

  loadVeloData() {
    this.veloService.showAll().subscribe(data => {
      this.dataSource.data = data;
      this.cdr.detectChanges(); // Assurez-vous que les changements sont appliqués
    });
  }

  get containerHeight(): number {
    const rowHeight = 55;  // Hauteur des lignes ajustée
    const headerHeight = 60;  // Hauteur de l'entête ajustée
    const paginatorHeight = 65; 
    return (this.dataSource.paginator?.pageSize ?? this.pageSize) * rowHeight + headerHeight + paginatorHeight;
  }
}