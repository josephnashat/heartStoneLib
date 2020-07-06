import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: HTMLIonLoadingElement;
  constructor(private loadingController: LoadingController) { }
  public async presentLoader(message: string) {
    this.loader = await this.loadingController.create({
      message,
    });
    this.loader.present();
  }
  public dismissLoader() {
    this.loader.dismiss();
  }
}
