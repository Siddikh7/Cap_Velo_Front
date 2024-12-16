import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';
import { ChangeDetectorRef } from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";


@Component({
  selector: 'app-tabletest',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDivider, MatButton, MatAnchor, MatButtonToggle],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css'
})
export class TableTestComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nom','quantite','description','pointgeo','actions'];

  /*dataSource!: MatTableDataSource<VeloModel>;*/
  dataSource = new MatTableDataSource<VeloModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;

  constructor(private veloService: VeloService, private cdr: ChangeDetectorRef, private router: Router){}

  ngOnInit(): void {
    this.loadVeloData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); // Détecter les changements après l'initialisation du paginator pour résoudre l'erreur
  }

  loadVeloData() {
    this.veloService.showAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<VeloModel>(data);
      //this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges(); // Assurez-vous que les changements sont appliqués
    });
  }

  // ngOnDestroy() {
  //   // Désabonnement pour éviter une fuite de mémoire
  //   this.veloService.unsubscribe();
  //   console.log('Désabonné dans ngOnDestroy.');
  // }
  onEdit(element: VeloModel): void {
    console.log('modifier', element);
    if (element.id) {
      this.router.navigate(['form'], { queryParams: { id: element.id } });
    } else {
      // Handle the error or edge case where id is not available
      console.error('Erreur: L\'ID du vélo est manquant');
    }
  }

  onAdd():void{
    this.router.navigate(['form']); // Redirige vers le composant formulaire
  }

  onDelete(element: VeloModel): void {
    if(element.id){
      if(confirm('vous voulez vraiment supprimer ce velo?')){
        this.veloService.delete(element.id).subscribe({
          next: () => {
            console.log('suppression reussie');
            this.dataSource.data = this.dataSource.data.filter(velo => velo.id != element.id);
            //ca serait bien que l'affichage se mette auto à jour sans rafraichir la page
            //a chaque fois
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

  get containerHeight(): number {
    const rowHeight = 55;  // Hauteur des lignes ajustée
    const headerHeight = 60;  // Hauteur de l'entête ajustée
    const paginatorHeight = 65;
    return (this.dataSource.paginator?.pageSize ?? this.pageSize) * rowHeight + headerHeight + paginatorHeight;
  }
}
