import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cakes-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './cakes-page.component.html',
})
export class CakesPageComponent {
  ngAfterViewInit() {
    $('.special_recipe_slider').owlCarousel({
      loop: true,
      margin: 10,
      autoWidth: true,
      autoplay: true,
      autoplayTimeout: 2000,
      nav: false,
      dots: true,
    });
  }
}
