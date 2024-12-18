import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';
import { ChangeDetectorRef } from '@angular/core';
import { MatDivider } from "@angular/material/divider";
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatButtonToggle } from "@angular/material/button-toggle";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

/**
 * Composant pour afficher et gérer les vélos dans une table.
 */
@Component({
  selector: 'app-tabletest',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDivider, MatButton, MatAnchor, MatButtonToggle],
  templateUrl: './table-test.component.html',
  styleUrl: './table-test.component.css'
})
export class TableTestComponent implements AfterViewInit, OnInit {

  /** Colonnes affichées dans la table */
  displayedColumns: string[] = ['nom', 'quantite', 'description', 'pointgeo', 'actions'];

  /** Source de données pour la table */
  dataSource = new MatTableDataSource<VeloModel>();
  pageSize = 5;

  /** Paginator pour la table */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private veloService: VeloService, private cdr: ChangeDetectorRef, private router: Router) {}

  /**
   * Initialisation du composant.
   */
  ngOnInit(): void {
    this.loadVeloData();
  }

  /**
   * Configuration du paginator après l'initialisation de la vue.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges(); // Détecter les changements après l'initialisation du paginator pour résoudre l'erreur
  }

  /**
   * Charge les données des vélos depuis le service.
   */
  loadVeloData() {
    this.veloService.showAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<VeloModel>(data);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges(); // Assurez-vous que les changements sont appliqués
    });
  }

  /**
   * Redirige vers le formulaire d'édition pour le vélo sélectionné.
   * @param element Le modèle de vélo à éditer.
   */
  onEdit(element: VeloModel): void {
    console.log('modifier', element);
    if (element.id) {
      this.router.navigate(['form'], { queryParams: { id: element.id } });
    } else {
      console.error('Erreur: L\'ID du vélo est manquant');
    }
  }

  /**
   * Redirige vers le formulaire d'ajout de vélo.
   */
  onAdd(): void {
    this.router.navigate(['form']); // Redirige vers le composant formulaire
  }

  /**
   * Supprime le vélo sélectionné après confirmation.
   * @param element Le modèle de vélo à supprimer.
   */
  onDelete(element: VeloModel): void {
    if (element.id) {
      if (confirm('vous voulez vraiment supprimer ce velo?')) {
        this.veloService.delete(element.id).subscribe({
          next: () => {
            console.log('suppression reussie');
            this.dataSource.data = this.dataSource.data.filter(velo => velo.id != element.id);
          },
          error: (err) => {
            console.error('erreur lors de la suppression', err, 'avec comme id', element.id);
          }
        });
      }
    } else {
      console.log('l id de element nexiste pas', element);
    }
  }

  /**
   * Calcule la hauteur du conteneur en fonction du nombre de lignes.
   * @returns La hauteur du conteneur.
   */
  get containerHeight(): number {
    const rowHeight = 55;  // Hauteur des lignes ajustée
    const headerHeight = 60;  // Hauteur de l'entête ajustée
    const paginatorHeight = 65;
    return (this.dataSource.paginator?.pageSize ?? this.pageSize) * rowHeight + headerHeight + paginatorHeight;
  }
}
