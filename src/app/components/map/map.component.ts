import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster'; // Importation du plugin de cluster de marqueurs
import { VeloService } from '../../services/velo.service';
import { VeloModel } from '../../models/velo.model';

/**
 * Composant pour afficher une carte avec des marqueurs de vélos.
 */
@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markerClusterGroup!: L.MarkerClusterGroup;

  // Définition de l'icône personnalisée pour les marqueurs
  private customIcon = L.icon({
    iconUrl: 'assets/3059964.png',
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });

  constructor(private veloService: VeloService) {}

  /**
   * Initialisation du composant.
   */
  ngOnInit(): void {
    this.initMap();

    // Création du groupe de clusters de marqueurs
    this.markerClusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50, // Ajustement du rayon pour le clustering
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `
          <div style="
            background-color: #212121;
            color: #ffffff;
            border: 3px solid #ffffff;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
            ${count}
          </div>`,
          className: 'cluster',
          iconSize: [30, 30] // Correspond aux dimensions CSS
        });
      }
    });

    // Récupération des données des vélos et ajout des marqueurs à la carte
    this.veloService.showAll().subscribe((velos: VeloModel[]) => {
      velos.forEach(velo => {
        const [latitude, longitude] = velo.pointGeo.split(' ').map(coord => parseFloat(coord));

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const marker = L.marker([latitude, longitude], { icon: this.customIcon })
            .bindPopup(`<b>${velo.nom}</b><br>${velo.description}<br>Quantité: ${velo.quantite}`);
          this.markerClusterGroup.addLayer(marker);
        } else {
          console.warn(`Invalid coordinates for vélo: ${velo.nom}`);
        }
      });

      // Ajout du groupe de clusters à la carte
      this.map.addLayer(this.markerClusterGroup);
    });
  }

  /**
   * Initialise la carte Leaflet.
   */
  private initMap(): void {
    this.map = L.map('map').setView([47.3946, 0.6848], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: ''
    }).addTo(this.map);
  }
}
