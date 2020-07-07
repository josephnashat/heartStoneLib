import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(
    private firebase: Firebase, // this is for cloud base messaging
    private platform: Platform,
    private afs: AngularFirestore // we need this only for the sake of firebase database
  ) {}

  async getToken() {
    let token: string;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
    }
    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }
    this.saveToken(token);
  }

  private saveToken(token: string) {
    // This is a function used to access firebase database
    if (!token) { return; }
    const devicesDocumentRef = this.afs.collection('devices');
    const data = {token, userId: 'currentUserId'};
    devicesDocumentRef.doc('token').set(data).then(success => console.log(success)).catch(error => console.log(error));
  }

  onNotifications() {
    return this.firebase.onNotificationOpen();
  }
}
