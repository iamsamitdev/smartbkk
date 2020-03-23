import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , NgForm} from '@angular/forms';
import { NavController, MenuController, LoadingController , AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

// เรียกใช้งาน Web API
import { WebapiService } from '../../services/webapi.service';

// เรียกใช้งาน Model
import { User } from '../../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public onRegisterForm: FormGroup;
  fullname: string;
  username: string;
  password: string;
  dataUser: User;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public api: WebapiService,
    private router: Router,
    public alertCtrl: AlertController,
  ) {
    this.dataUser = new User();
   }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      fullname: [null, Validators.compose([
        Validators.required
      ])],
      username: [null, Validators.compose([
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  checkRegister(form: NgForm) {
    // alert(JSON.stringify(form));
    this.dataUser.fullname = form['fullname'];
    this.dataUser.username = form['username'];
    this.dataUser.password = form['password'];

    this.api.register(this.dataUser)
      .subscribe(res => {
          console.log(res);
          if(res['status'] === 'success'){
            // ส่งไปหน้า tabs
            this.presentAlert('ลงทะเบียนเรียบร้อยแล้ว');
            this.router.navigate(['']);
          } else {
            // alert('login fail!');
            this.presentAlert('ผิดพลาด ลงทะเบียนไม่สำเร็จ');
          }
        }, (err) => {
          console.log(err);
        });
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Login Status',
     // subHeader: 'Login message',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }

}
