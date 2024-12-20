import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {VeloModel} from "../../models/velo.model";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {VeloService} from "../../services/velo.service";
import {ReservationModel} from "../../models/reservation.model";
import {ReservationService} from "../../services/reservation.service";
import {UtilisateurService} from "../../services/utilisateur.service";
import {UtilisateurModel} from "../../models/utilisateur.model";
import {MatAnchor, MatButton, MatButtonModule} from "@angular/material/button";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";

/**
 * Composant pour gérer les réservations de vélos.
 */
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    MatAnchor,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDivider,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDividerModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit, OnInit {
  /** Colonnes affichées dans la table */
  displayedColumns: string[] = ['utilisateurId','veloId','veloName','veloQuantite','reservation', 'actions'];

  /** Source de données pour la table */
  dataSource = new MatTableDataSource<ReservationModel>();

  /** Liste des vélos */
  velos: VeloModel[] = [];

  /** Liste des utilisateurs */
  utilisateurs: UtilisateurModel[] = [];

  /** Paginator pour la table */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /** Taille de la page pour le paginator */
  pageSize = 5;

  /** Indicateur pour afficher ou masquer le filtre */
  showFilter = false;

  /** ID de l'utilisateur sélectionné pour le filtre */
  selectedUserId: number | null = null;

  constructor(
    private reservationService: ReservationService,
    private veloService: VeloService,
    private utilisateurService: UtilisateurService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  /**
   * Initialisation du composant.
   */
  ngOnInit(): void {
    this.loadReservationData();
    this.loadVelos();
    this.loadUtilisateurs();
  }

  /**
   * Charge les données des réservations depuis le service.
   */
  loadReservationData() {
    this.reservationService.showAll().subscribe(value => {
      console.log(value);
      this.dataSource = new MatTableDataSource<ReservationModel>(value);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    });
  }

  /**
   * Charge les données des vélos depuis le service.
   */
  loadVelos(): void {
    this.veloService.showAll().subscribe({
      next: (data) => this.velos = data,
      error: (err) => console.error('Failed to load vélos', err)
    });
  }

  /**
   * Charge les données des utilisateurs depuis le service.
   */
  loadUtilisateurs(): void {
    this.utilisateurService.showAll().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Failed to load utilisateurs', err)
    });
  }

  /**
   * Obtient les détails d'un vélo en fonction de son ID.
   * @param veloId L'ID du vélo.
   * @returns Les détails du vélo (nom et quantité) ou undefined si non trouvé.
   */
  getVeloDetails(veloId: number): { nom: string, quantite: number } | undefined {
    const velo = this.velos.find(velo => velo.id === veloId);
    return velo ? { nom: velo.nom, quantite: velo.quantite } : undefined;
  }

  /**
   * Configuration du paginator après l'initialisation de la vue.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  /**
   * Redirige vers le formulaire d'édition pour la réservation sélectionnée.
   * @param element Le modèle de réservation à éditer.
   */
  onEdit(element: ReservationModel): void {
    this.router.navigate(['add-reservation'], { queryParams: { veloId: element.veloId, utilisateurId: element.utilisateurId } });
  }

  /**
   * Supprime la réservation sélectionnée après confirmation.
   * @param element Le modèle de réservation à supprimer.
   */
  onDelete(element: ReservationModel): void {
    this.reservationService.delete(element.veloId, element.utilisateurId).subscribe({
      next: () => {
        console.log('suppression reussie');
        this.dataSource.data = this.dataSource.data.filter(reservation => reservation.veloId !== element.veloId && reservation.utilisateurId !== element.utilisateurId);
      },
      error: (err) => {
        console.error('erreur lors de la suppression', err, 'avec comme id', element.veloId);
      }
    });
  }

  /**
   * Redirige vers le formulaire d'ajout de réservation.
   */
  onAdd(): void {
    this.router.navigate(['add-reservation']);
  }

  /**
   * Affiche ou masque le filtre.
   */
  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  /**
   * Applique le filtre en fonction de l'utilisateur sélectionné.
   */
  applyFilter(): void {
    if (this.selectedUserId) {
      this.dataSource.data = this.dataSource.data.filter(reservation => reservation.utilisateurId === this.selectedUserId);
    } else {
      this.loadReservationData();
    }
  }

  /**
   * Calcule la hauteur du conteneur en fonction du nombre de lignes.
   * @returns La hauteur du conteneur.
   */
  get containerHeight(): number {
    const rowHeight = 55;
    const headerHeight = 60;
    const paginatorHeight = 65;
    return (this.dataSource.paginator?.pageSize ?? this.pageSize) * rowHeight + headerHeight + paginatorHeight;
  }
}
