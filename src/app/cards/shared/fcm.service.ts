import { AlerterService } from './alerter.service';
import { ToasterService } from './toaster.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(
    private platform: Platform,
    private afs: AngularFirestore, // we need this only for the sake of firebase database
    private toaster: AlerterService
  ) {}

  getToken() {
    // FCM.subscribeToTopic('test');
    if (this.platform.is('android')) {
      this.toaster.presentAlert('Android', '');
      FCM.getToken()
        .then(
          (token) => {
            this.saveToken(token);
            console.log(token);
          },
          (rejected) => this.toaster.presentAlert(rejected, '')
        )
        .catch((error) =>
          this.toaster.presentAlert('Android err ' + error, '')
        );
    } else if (this.platform.is('ios')) {
      this.toaster.presentAlert('IOS!', '');
      FCM.hasPermission().then((hasPermission) => {
        if (hasPermission) {
          this.toaster.presentAlert('Already Has permission!', '');
          FCM.getAPNSToken().then((token) => {
            this.toaster.presentAlert('has permission, apns', '');
            this.saveToken(token);
          });
          FCM.getToken().then((token) => {
            this.toaster.presentAlert('has permission, get token', '');
            this.saveToken(token);
          });
        } else {
          FCM.requestPushPermission().then((permissionGranted) => {
            this.toaster.presentAlert('Request permission!', '');
            FCM.getAPNSToken().then((token) => {
              this.toaster.presentAlert('request permission, apns', '');
              this.saveToken(token);
            });
            FCM.getToken().then((token) => {
              this.toaster.presentAlert('request permission, get token', '');
              this.saveToken(token);
            });
          });
        }
      });
    }
    FCM.onTokenRefresh().subscribe((token) => {
      console.log(token);
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
    return FCM.onNotification();
  }
}
