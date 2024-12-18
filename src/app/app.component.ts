import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/Authentification.service';
import { CommonModule } from '@angular/common';

/**
 * Composant principal de l'application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatAnchor, RouterLink, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cap-velo';
  currentUser: any = null;

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  /**
   * Navigue vers une route spécifiée.
   * @param route La route vers laquelle naviguer.
   */
  navigate(route: string) {
    console.log(`Navigating to ${route}`);
    this.router.navigate([route]);
  }
}
