import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// เรียกใช้งาน Web API
import { WebapiService } from '../../services/webapi.service';

// เรียกใช้งาน Model
import { Product } from '../../model/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  // สร้างตัวแปรไว้เก็บข้อมูลจาก API
  productData = {
    id: '',
    product_name: '',
    product_barcode: '',
    product_price: '',
    product_category: '',
    product_date: '',
    product_image: '',
  }

  // รับค่า id จากหน้า product
  getid: any;

  constructor(
    public router: Router,
    public api: WebapiService,
    private actRoute: ActivatedRoute
  ) {
    this.getid = this.actRoute.snapshot.params['id'];
  }


  ngOnInit() {
    //alert(this.getid);
    this.api.geProductByID(this.getid).subscribe(response => {
      console.log(response);
      this.productData.product_name = response[0].product_name;
      this.productData.product_barcode = response[0].product_barcode;
      this.productData.product_price = response[0].product_price;
      this.productData.product_category = response[0].product_category;
      this.productData.product_date = response[0].product_date;
      this.productData.product_image = response[0].product_image;
    });
    console.log(this.productData);
  }

}
