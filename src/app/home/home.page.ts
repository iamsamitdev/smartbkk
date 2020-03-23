import { Component } from '@angular/core';
import { Router } from '@angular/router';

// เรียกใช้งาน Web API
import { WebapiService } from '../services/webapi.service';

// เรียกใช้งาน Model
import { Product } from '../model/Product';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  // สร้างตัวแปรไว้เก็บข้อมูลจาก API
  productData: any;

  segnav = 'Home';

  constructor(
    public router: Router,
    public api: WebapiService
  ) { 
    this.productData = [];
  }

  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    autoplay: true
  };

  btnLogout(){
    // ส่งไปหน้า login
     this.router.navigate(['']);
   }

  ngOnInit() {
    this.getProducts();
  }

  // ฟังก์ชันเรียกอ่านข้อมูลสินค้า
  getProducts() {
    this.api.geProductList().subscribe(response => {
      console.log(response);
      this.productData = response;
    });
  }


  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getProducts();
    }, 5000);
  }

  // ส่วนของการเปิดหน้ารายละเอียดสินค้า
  showProductDetail(id){
    // ส่งไปหน้า ProductDetail
    this.router.navigateByUrl('/product-detail/' + id);
  }

}
