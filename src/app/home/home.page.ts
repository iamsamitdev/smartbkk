import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  segnav = 'Home';

  constructor(public router: Router) { }

  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    autoplay: true
  };

  btnLogout(){
    // ส่งไปหน้า login
     this.router.navigate(['']);
   }

}
