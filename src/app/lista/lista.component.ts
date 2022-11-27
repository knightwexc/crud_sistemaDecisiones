import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../service/empleados.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.listarEmpleados();
  }

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellidos',
    'domicilio',
    'puesto',
    'sucursal',
    'sueldo',
    'prioridad',
  ];
  arrayService: [] = [];
  listarEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (res) => {
        this.arrayService = res;
        console.log(this.arrayService);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
