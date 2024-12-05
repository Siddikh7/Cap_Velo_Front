import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster'; // Import the marker cluster plugin
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
  private markerClusterGroup!: L.MarkerClusterGroup;

  private customIcon = L.icon({
    iconUrl: 'assets/pin.png', 
    iconSize: [38, 38], 
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });

  constructor(private veloService: VeloService) {}

  ngOnInit(): void {
    this.initMap();

    // Create the marker cluster group
    this.markerClusterGroup = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50, // Adjust the radius for clustering
    iconCreateFunction: (cluster) => {
      const count = cluster.getChildCount();
      return L.divIcon({
        //Bon j'ai utilisé la maniere forte et ca marche
        html: `
        <div style="
          background-color: #adebb3; 
          color: #333; 
          border: 3px solid #4CAF50; 
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
        iconSize: [30, 30] // This matches your CSS dimensions
      });
    }

    
    });

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
      

      // Add the cluster group to the map
      this.map.addLayer(this.markerClusterGroup);
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
