import { AlerterService } from './alerter.service';
import { ToasterService } from './toaster.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(
    private firebaseX: FirebaseX, // this is for cloud base messaging
    private platform: Platform,
    private afs: AngularFirestore, // we need this only for the sake of firebase database
    private toaster: AlerterService
  ) {}

  async getToken() {
    if (this.platform.is('android')) {
      this.firebaseX
        .getToken()
        .then((token) => {
          this.saveToken(token);
        })
        .catch((err) => {
          this.toaster.presentAlert('err android: ' + err, '');
        });
    }
    if (this.platform.is('ios')) {
      // this.toaster.presentToast('ios');
      this.firebaseX
        .getToken()
        .then((token) => {
          this.saveToken(token);
        })
        .catch((err) => {
          this.toaster.presentAlert('err ios token: ' + err, '');
        });
      this.firebaseX
        .grantPermission()
        .then((granted) => this.toaster.presentAlert('granted', ''))
        .catch((err) =>
          this.toaster.presentAlert('err ios permission: ' + err, '')
        );
    }

    this.saveToken(null);
  }

  private saveToken(token: string) {
    // This is a function used to access firebase database
    let data = {};
    const devicesDocumentRef = this.afs.collection('devices');
    if (token) {
      this.toaster.presentAlert('token exist', '');
      data = { token, userId: 'currentUserId' };
      devicesDocumentRef
        .doc(token)
        .set(data)
        .then((success) => console.log(success))
        .catch((error) => console.log(error));
    } else {
      this.toaster.presentAlert('no token exist', '');
      data = {
        token: 'ManualToken' + Date.now().toString(),
        userId: 'currentUserId',
      };
      devicesDocumentRef
        .doc('token' + +Date.now().toString())
        .set(data)
        .then((success) => this.toaster.presentAlert('success db', ''))
        .catch((error) => this.toaster.presentAlert('error db' + error, ''));
    }
  }

  onNotifications() {
    return this.firebaseX.onMessageReceived();
  }
}
