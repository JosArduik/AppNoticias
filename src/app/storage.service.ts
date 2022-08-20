import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'Noticia';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { this.init(); }
  async init() {
    console.log('INIT');
    await this.storage.create();
    console.log('DONE');
  }

  getData() {
    console.log('GET DATOS');
    return this.storage.get(STORAGE_KEY) || [];
  }

  async guardarDatos(item) {
    const storedData = (await this.storage.get(STORAGE_KEY)) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async ModificarDatos(item) {
    const storedData = (await this.storage.get(STORAGE_KEY)) || [];
    storedData.set(1, item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async eliminarItem(index) {
    const storedData = (await this.storage.get(STORAGE_KEY)) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);
  }
}