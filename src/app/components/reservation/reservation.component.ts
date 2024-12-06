import {Component, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {VeloModel} from "../../models/velo.model";
import {MatPaginator} from "@angular/material/paginator";
import {VeloService} from "../../services/velo.service";
import {ReservationModel} from "../../models/reservation.model";
import {ReservationService} from "../../services/reservation.service";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
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
    MatTable
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  displayedColumns: string[] = ['utilisateur','velo','quantite', 'reservation'];

  dataSource!: MatTableDataSource<ReservationModel>;
  //dataSource = new MatTableDataSource<reserv>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private reservationService: ReservationService){}

  ngOnInit(): void {
    this.reservationService.showAll().subscribe(value => {
      console.log(value);
      this.dataSource = new MatTableDataSource<ReservationModel>(value);
      this.dataSource.paginator = this.paginator;
    });
  }
  onEdit(element: ReservationModel): void {
    console.log('modifier', element);
    //flm
  }

  onDelete(element: ReservationModel): void {
    console.log('modifier', element)
  }
}
