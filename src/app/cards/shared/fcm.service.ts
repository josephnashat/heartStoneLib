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
    private afs: AngularFirestore // we need this only for the sake of firebase database
  ) {}

  async getToken() {
    let token: string;
    if (this.platform.is('android')) {
      token = await this.firebaseX.getToken();
    }
    if (this.platform.is('ios')) {
      token = await this.firebaseX.getToken();
      await this.firebaseX.grantPermission();
    }
    this.saveToken(token);
  }

  private saveToken(token: string) {
    // This is a function used to access firebase database
    let data = {};
    const devicesDocumentRef = this.afs.collection('devices');
    if (token) {
      data = { token, userId: 'currentUserId' };
      devicesDocumentRef
      .doc(token)
      .set(data)
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
    }else {
      data = { token: 'ManualToken' + Date.now().toString(), userId: 'currentUserId' };
      devicesDocumentRef
      .doc('token' + + Date.now().toString())
      .set(data)
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
    }
  }

  onNotifications() {
    return this.firebaseX.onMessageReceived();
  }
}
