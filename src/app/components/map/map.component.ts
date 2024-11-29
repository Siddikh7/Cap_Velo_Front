import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;


  private customIcon = L.icon({
    iconUrl: 'assets/pin.png', 
    iconSize: [38, 38], 
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });

  constructor(private veloService: VeloService) {}

  ngOnInit(): void {
    this.initMap();

    // Récupérez les vélos et ajoutez leurs points sur la carte
    this.veloService.showAll().subscribe((velos: VeloModel[]) => {
      velos.forEach(velo => {
        // Transformez pointGeo en latitude et longitude
        const [latitude, longitude] = velo.pointGeo.split(' ').map(coord => parseFloat(coord));

        if (!isNaN(latitude) && !isNaN(longitude)) {
          // Ajoutez un marqueur avec l'icône personnalisée
          L.marker([latitude, longitude], { icon: this.customIcon })
            .bindPopup(`<b>${velo.nom}</b><br>${velo.description}<br>Quantité: ${velo.quantite}`)
            .addTo(this.map);
        } else {
          console.warn(`Coordonnées invalides pour le vélo: ${velo.nom}`);
        }
      });
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([47.3946, 0.6848], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }
}