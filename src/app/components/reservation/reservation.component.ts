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
    MatDividerModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['utilisateurId','veloId','veloName','veloQuantite','reservation', 'actions'];
  dataSource = new MatTableDataSource<ReservationModel>();
  velos: VeloModel[] = [];
  utilisateurs: UtilisateurModel[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;

  constructor(
    private reservationService: ReservationService,
    private veloService: VeloService,
    private utilisateurService: UtilisateurService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReservationData();
    this.loadVelos();
    this.loadUtilisateurs();
  }

  loadReservationData() {
    this.reservationService.showAll().subscribe(value => {
      this.dataSource = new MatTableDataSource<ReservationModel>(value);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    });
  }

  loadVelos(): void {
    this.veloService.showAll().subscribe({
      next: (data) => this.velos = data,
      error: (err) => console.error('Failed to load vélos', err)
    });
  }

  loadUtilisateurs(): void {
    this.utilisateurService.showAll().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Failed to load utilisateurs', err)
    });
  }
  getVeloDetails(veloId: number): { nom: string, quantite: number } | undefined {
    const velo = this.velos.find(velo => velo.id === veloId);
    return velo ? { nom: velo.nom, quantite: velo.quantite } : undefined;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  onEdit(element: ReservationModel): void {
    console.log('modifier', element);
  }

  onDelete(element: ReservationModel): void {
    console.log('supprimer', element);
  }

  onAdd(): void {
    this.router.navigate(['add-reservation']);
  }

  get containerHeight(): number {
    const rowHeight = 55;
    const headerHeight = 60;
    const paginatorHeight = 65;
    return (this.dataSource.paginator?.pageSize ?? this.pageSize) * rowHeight + headerHeight + paginatorHeight;
  }
}