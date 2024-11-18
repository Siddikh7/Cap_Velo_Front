import {Component, OnInit} from '@angular/core';
import {VeloModel} from "../../models/velo.model";
import {VeloService} from "../../services/velo.service";

@Component({
  selector: 'app-velo',
  templateUrl: './velo.component.html',
  styleUrl: './velo.component.css'
})
@Component({
  selector: 'app-velo',
  templateUrl: './velo.component.html',
  styleUrls: ['./velo.component.css']
})
export class VeloComponent implements OnInit {
  velos: VeloModel[] | undefined;

  constructor(private veloService: VeloService) {}

  ngOnInit(): void {
    this.veloService.showAll().subscribe(
      (data) => this.velos = data,
      (error) => console.error('Erreur lors de la récupération des vélos', error)
    );
  }
}
