import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  @Input() imagen: string;
  @Input() fuente: string;
  @Input() titulo: string;
  @Input() contenido: string;

  constructor(public alertController: AlertController, public modalController: ModalController) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
  
  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'Alerta',
      //subHeader: 'Subtitle',
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  guardarDatos() {
    var image = (<HTMLInputElement>document.getElementById('txtImagen')).value;
    var font = (<HTMLInputElement>document.getElementById('txtFuente')).value;
    var title = (<HTMLInputElement>document.getElementById('txtTitulo')).value;
    var content = (<HTMLInputElement>document.getElementById('txtContenido')).value;

    if (image == '') {
      this.presentAlert('Imagen: Ubique una URL de Imagen');
    } else if (font == '') {
      this.presentAlert('Escriba la fuente de la noticia');
    } else if (title == '') {
      this.presentAlert('Escriba el titulo de la noticia');
    } else if (content == '') {
      this.presentAlert('Escriba el contenido de la noticia');
    } else {
      this.modalController.dismiss({
        imagen: image,
        fuente: font,
        titulo: title,
        contenido: content,
      });
    }
  }

}
