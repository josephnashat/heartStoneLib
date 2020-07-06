import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlerterService {

  constructor(private alertController: AlertController) { }
  async presentAlert(message: string, subHeader: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
