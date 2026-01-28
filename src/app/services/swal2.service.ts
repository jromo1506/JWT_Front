import { Injectable } from '@angular/core';

import Swal, { SweetAlertIcon } from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class Swal2Service {

  constructor() { }


  
  success(title: string, text?: string) {
    this.fire(title, text, 'success');
  }

  error(title: string, text?: string) {
    this.fire(title, text, 'error');
  }

  warning(title: string, text?: string) {
    this.fire(title, text, 'warning');
  }

  info(title: string, text?: string) {
    this.fire(title, text, 'info');
  }

  confirm(
    title: string,
    text: string,
    confirmButtonText = 'Aceptar',
    cancelButtonText = 'Cancelar'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    }).then(result => result.isConfirmed);
  }

  private fire(title: string, text: string | undefined, icon: SweetAlertIcon) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK'
    });
  }
}
