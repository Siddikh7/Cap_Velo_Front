import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { ReservationModel } from '../../models/reservation.model';

/**
 * Composant pour gérer les réservations.
 */
@Component({
  selector: 'app-reservation',
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  dataSource = new MatTableDataSource<ReservationModel>();
  displayedColumns: string[] = ['utilisateurId', 'veloId', 'veloName', 'veloQuantite', 'reservation', 'actions'];
  showFilter = false;
  selectedUserId: number | null = null;
  utilisateurs: any[] = [];
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReservationData();
  }

  /**
   * Charge les données de réservation.
   */
  loadReservationData(): void {
    this.reservationService.showAll().subscribe((data: ReservationModel[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    });
  }

  /**
   * Navigue vers la page d'édition de réservation.
   * @param element L'élément de réservation à éditer.
   */
  onEdit(element: ReservationModel): void {
    this.router.navigate(['add-reservation'], { queryParams: { veloId: element.veloId, utilisateurId: element.utilisateurId } });
  }

  /**
   * Supprime une réservation.
   * @param element L'élément de réservation à supprimer.
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
   * Navigue vers la page d'ajout de réservation.
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
   * Applique le filtre de réservation par utilisateur.
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
