import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../service/empleados.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  constructor(
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

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
    'editar',
    'eliminar',
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

  eliminarUsuarioLista(id: number) {
    this.empleadosService.borrarEmpleado(id).subscribe(
      (res) => {
        console.log(res.message);
        alert(res.message);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/lista']);
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editarUsuarioLista(id: number) {
    // this.empleadosService.editarEmpleado(id).subscribe();
    this.router.navigate(['/form/', { id: id }]);
  }
}
