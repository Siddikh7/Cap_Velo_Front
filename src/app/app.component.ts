import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'cap-velo';

    constructor(private router: Router) {}

    navigate(route: string) {
        console.log(`Navigating to ${route}`);
        this.router.navigate([route]);
    }
}
