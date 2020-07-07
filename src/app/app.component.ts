import { ToasterService } from './cards/shared/toaster.service';
import { FcmService } from './cards/shared/fcm.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    private toaster: ToasterService
  ) {
    this.initializeApp();
    this.setupFCM();
  }
  private async setupFCM() {
    await this.fcm.getToken();
    this.fcm.onNotifications().subscribe((notification) => {
      this.toaster.presentToast(notification.body);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
