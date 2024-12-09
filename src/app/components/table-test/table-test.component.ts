import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';
import { ChangeDetectorRef } from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-tabletest',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDivider, MatButton, MatAnchor],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css'
})
export class TableTestComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nom','quantite','description','pointgeo','actions'];

  /*dataSource!: MatTableDataSource<VeloModel>;*/
  dataSource = new MatTableDataSource<VeloModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;

  constructor(private veloService: VeloService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.veloService.showAll().subscribe(value => {
      console.log(value);
      this.dataSource = new MatTableDataSource<VeloModel>(value);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }
  onEdit(element: VeloModel): void {
    console.log('modifier', element);
    //flm
  }

  onDelete(element: VeloModel): void {
    if(element.id){
      if(confirm('vous voulez vraiment supprimer ce velo?')){
        this.veloService.delete(element.id).subscribe({
          next: () => {
            console.log('suppression reussie');
            this.dataSource.data = this.dataSource.data.filter(velo => velo.id != element.id);
          },
          error: (err) => {
            console.error('erreur lors de la suppression',err,'avec comme id', element.id);
          }
        })
      }
    }else{
      console.log('l id de element nexiste pas', element);
    }
  }
}
