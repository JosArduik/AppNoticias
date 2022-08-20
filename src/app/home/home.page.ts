import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonList, ModalController } from '@ionic/angular';
import { FormularioPage } from '../formulario/formulario.page';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonList) ionlist: IonList;
  
  listaDatos: any[] = [];

  noticias = [];

  public nuevaNoticia = { id: 0, imagen: '', fuente: '', titulo: '' , contenido: ''};

  constructor(
    public actionSheetController: ActionSheetController, 
    public modalController: ModalController, 
    private storageService: StorageService,) {this.cargarDatos();}

  ngOnInit() {
    this.listaDatos = this.noticias;
  }
  async cargarDatos() {
    this.listaDatos = await this.storageService.getData();
  }

  async guardarDatos(item) {
    await this.storageService.guardarDatos(item);
    this.cargarDatos();
  }

  async eliminarItem(index) {
    this.storageService.eliminarItem(index);
    this.listaDatos.splice(index, 1);
  }
  async abrirModal(noticia) {
    console.log(noticia);
    const modal = await this.modalController.create({
      component: FormularioPage,
      componentProps: {
        imagen: noticia.imagen,
        fuente: noticia.fuente,
        titulo: noticia.titulo,
        contenido: noticia.contenido,
      },
    });

    await modal.present();
    //recuperar información del modal
    var { data } = await modal.onWillDismiss();
    if (data != undefined) {
      if (noticia.id == 0) {
        data.id = new Date().getTime();
        this.guardarDatos(data);
      } else {
        noticia.imagen = data.imagen;
        noticia.fuente= data.fuente;
        noticia.titulo= data.titulo;
        noticia.contenido= data.contenido;
      }
      console.log(data);
    }
    this.closeItem();
  }
 
  closeItem() {
    this.ionlist.closeSlidingItems();
  }

 
  async mostrarAcciones(indice,noticia) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.eliminarItem(indice);
        }
      }, {
        text: 'Editar',
        icon: 'create',
        data: 10,
        cssClass: 'black',
        handler: () => {
          console.log('Share clicked');
          this.abrirModal(noticia)
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

}


