import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , NgForm} from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

// เรียกใช้งาน Web API
import { WebapiService } from '../../services/webapi.service';

// เรียกใช้งาน Model
import { User } from '../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;
  username: string;
  password: string;
  dataUser: User;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public api: WebapiService,
    private router: Router
  ) {
    this.dataUser = new User();
   }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      username: [null, Validators.compose([
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you username to send a reset link password.',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                // showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  checkLogin(form: NgForm) {
    // alert(JSON.stringify(form));
    this.dataUser.username = form['username'];
    this.dataUser.password = form['password'];

    this.api.checkLogin(this.dataUser)
      .subscribe(res => {
          console.log(res);
          if(res['status'] == 'success'){
            // ส่งไปหน้า tabs
            this.router.navigate(['home']);
          } else {
            // alert('login fail!');
            this.presentAlert('ข้อมูลเข้าระบบไม่ถูกต้อง');
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

}
