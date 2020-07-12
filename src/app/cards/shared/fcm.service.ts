import { AlerterService } from './alerter.service';
import { ToasterService } from './toaster.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(
    private fcm: FCM, // this is for cloud base messaging
    private platform: Platform,
    private afs: AngularFirestore, // we need this only for the sake of firebase database
    private toaster: AlerterService
  ) {}

  async getToken() {
    if (this.platform.is('android')) {
      this.toaster.presentAlert('Android!', '');
      this.fcm.hasPermission().then((hasPermission) => {
        if (hasPermission) {
          this.toaster.presentAlert('Has permission!', '');
          this.fcm.getToken().then(token => {
            this.saveToken(token);
          }).catch(error => this.toaster.presentAlert('Android err ' + error, ''));
        }
      });
    } else if (this.platform.is('ios')) {
      this.toaster.presentAlert('IOS!', '');
      this.fcm.hasPermission().then((hasPermission) => {
        if (hasPermission) {
          this.toaster.presentAlert('Has permission!', '');
          this.fcm.getAPNSToken().then(token => {
            this.saveToken(token);
          });

        } else {
          this.fcm.requestPushPermissionIOS().then((permissionGranted) => {
            this.toaster.presentAlert('Has permission!', '');
            this.fcm.getAPNSToken().then(token => {
              this.saveToken(token);
            });
          });
        }
      });
    }
    this.fcm.onTokenRefresh().subscribe((token) => {
      this.saveToken(token, true);
    });
  }

  private saveToken(token: string, updated: boolean = false) {
    // This is a function used to access firebase database
    let data = {};
    const devicesDocumentRef = this.afs.collection('devices');
    if (token) {
      data = { token, userId: 'currentUserId', updated };
      devicesDocumentRef
        .doc(token)
        .set(data)
        .then((success) => console.log(success))
        .catch((error) => console.log(error));
    } else {
      data = {
        token: 'ManualToken' + Date.now().toString(),
        userId: 'currentUserId',
        updated,
      };
      devicesDocumentRef
        .doc('token' + +Date.now().toString())
        .set(data)
        .then((success) => this.toaster.presentAlert('success db', ''))
        .catch((error) => this.toaster.presentAlert('error db' + error, ''));
    }
  }

  onNotifications() {
    return this.fcm.onNotification();
  }
}
