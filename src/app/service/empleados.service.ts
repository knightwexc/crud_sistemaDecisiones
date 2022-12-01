import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  url = 'http://localhost:8080'; //No tenía el http://   XDD
  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get(this.url + '/empleado');
  }

  getEmpleado(id: number): Observable<any> {
    return this.http.get(this.url + '/empleado/' + id);
  }

  guardarEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(this.url + '/empleado', empleado);
  }

  editarEmpleado(id: number, empleado: Empleado): Observable<any> {
    return this.http.put(this.url + '/empleado/' + id, empleado);
  }

  borrarEmpleado(id: number): Observable<any> {
    return this.http.delete(this.url + '/empleado/' + id);
  }
  //SERVICIO PARA PRODUCTOS
  getProductos(): Observable<any> {
    return this.http.get(this.url + '/productos');
  }
  getProducto(id: number): Observable<any> {
    return this.http.get(this.url + '/productos/' + id);
  }
  addProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url + '/productos', producto);
  }
  borrarProducto(id: number): Observable<any> {
    return this.http.delete(this.url + '/productos/' + id);
  }
  //SERVICIO PARA LABORES
  getPromedioCantidad(): Observable<any> {
    return this.http.get(this.url + '/productos/avg');
  }
  getTotalCantidad(): Observable<any> {
    return this.http.get(this.url + '/productos/sum');
  }
  getPromedioEmpleado(id: any): Observable<any> {
    return this.http.get(this.url + '/productos/avg=' + id);
  }
  getTotalEmpleado(id: number): Observable<any> {
    return this.http.get(this.url + '/productos/sum=' + id);
  }
  getMaximoLabor(): Observable<any> {
    return this.http.get(this.url + '/productos/max');
  }
  getMinimoLabor(): Observable<any> {
    return this.http.get(this.url + '/productos/min');
  }
}

export interface Empleado {
  nombre: string;
  apellidos: string;
  puesto: string;
  sucursal: string;
  domicilio: string;
  sueldo: number;
}

export interface Producto {
  empleado: number;
  fecha: string;
  hora: string;
  cantidad: number;
  id: number;
}
export interface InfoProductos {
  total: any;
  promedio: any;
  maximo: any;
  minimo: any;
}

export interface God {
  apellidos: string;
  domicilio: string;
  id: number;
  nombre: string;
  puesto: string;
  status: number;
  sucursal: string;
  sueldo: number;
}
