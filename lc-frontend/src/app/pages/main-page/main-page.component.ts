import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  // ngAfterViewInit() {
  //   $('#main_slider').revolution({
  //     sliderType: 'standard',
  //     sliderLayout: 'auto',
  //     delay: 5000,
  //     navigation: {
  //       arrows: { enable: true }
  //     },
  //   });
    
  //   $('.cake_feature_slider').owlCarousel({
  //     loop: true,
  //     margin: 10,
  //     autoWidth: true,
  //     autoplay: true,
  //     autoplayTimeout: 2000,
  //     nav: true,
  //     navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  //     dots: true,
  //   });

  //   $('.special_recipe_slider').owlCarousel({
  //     loop: true,
  //     margin: 10,
  //     autoWidth: true,
  //     autoplay: true,
  //     autoplayTimeout: 2000,
  //     nav: false,
  //     dots: true,
  //   });

  //   $('.client_says_slider').owlCarousel({
  //     loop: true,
  //     margin: 10,
  //     autoWidth: true,
  //     autoplay: true,
  //     autoplayTimeout: 2000,
  //     nav: false,
  //   });
  // }

}
