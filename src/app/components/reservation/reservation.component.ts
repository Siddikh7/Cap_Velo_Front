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
import {MatAnchor, MatButton, MatButtonModule} from "@angular/material/button";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";

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
  displayedColumns: string[] = ['utilisateurId','veloId','reservation','quantite', 'actions'];

  dataSource = new MatTableDataSource<ReservationModel>();
  //dataSource = new MatTableDataSource<reserv>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reservationService: ReservationService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.reservationService.showAll().subscribe(value => {
      console.log(value);
      this.dataSource = new MatTableDataSource<ReservationModel>(value);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }
  onEdit(element: ReservationModel): void {
    console.log('modifier', element);
    //flm
  }

  onDelete(element: ReservationModel): void {
    console.log('supprimer', element)
  }
}
