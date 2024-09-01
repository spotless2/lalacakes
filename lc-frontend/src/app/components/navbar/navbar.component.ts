import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  pageTitle = '';
  pageTitleDescription = '';
  routeVariable = '';

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setBannerValues(this.router.url);
      }
    });
  }

  setBannerValues(url: string): void {
    switch (url) {
      case '/cakes':
        this.pageTitle = 'Torturi';
        this.pageTitleDescription = 'Torturile noastre';
        this.routeVariable = '/cakes';
        break;
      case '/plates':
        this.pageTitle = 'Platouri';
        this.pageTitleDescription = 'Platourile noastre delicioase';
        this.routeVariable = '/plates';
        break;
      case '/about':
        this.pageTitle = 'Despre noi';
        this.pageTitleDescription = 'Cine suntem noi';
        this.routeVariable = '/about';
        break;
      case '/contact':
        this.pageTitle = 'Contact';
        this.pageTitleDescription = 'Contactează-ne';
        this.routeVariable = '/contact';
        break;
      default:
        this.pageTitle = '';
        this.pageTitleDescription = '';
        this.routeVariable = '';
    }
  }
}
