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
    console.log('empleado guardado');
  }

  borrarEmpleado(id: number): Observable<any> {
    return this.http.delete(this.url + '/empleado/' + id);
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
