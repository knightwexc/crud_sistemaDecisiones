import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../service/empleados.service';
import { Router } from '@angular/router';

interface Sucursales {
  value: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  objectEmpleado: any;
  idRoute: any;
  constructor(
    private formBuilder: FormBuilder,
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

  empleadoForm!: FormGroup;

  ngOnInit(): void {
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      domicilio: ['', Validators.required],
      puesto: ['', Validators.required],
      sucursal: ['', Validators.required],
      sueldo: ['', Validators.required],
    });

    if (this.router.url.includes(';id')) {
      this.idRoute = this.router.url.replace('/form;id=', '');
      this.empleadosService.getEmpleado(Number(this.idRoute)).subscribe(
        (res) => {
          this.objectEmpleado = res;
          console.log(this.objectEmpleado);

          this.empleadoForm.setValue({
            nombre: this.objectEmpleado.nombre,
            apellidos: this.objectEmpleado.apellidos,
            puesto: this.objectEmpleado.puesto,
            sucursal: this.objectEmpleado.sucursal,
            domicilio: this.objectEmpleado.domicilio,
            sueldo: this.objectEmpleado.sueldo,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  hide = true;

  sucursales: Sucursales[] = [
    { value: 'Culiacán' },
    { value: 'Mazatlán' },
    { value: 'Nuevo León' },
  ];

  addEmpleado() {
    console.log(this.empleadoForm.value);
    this.empleadosService.guardarEmpleado(this.empleadoForm.value).subscribe({
      next: (res) => {
        alert('Empleado registrado');
      },
      error: () => {
        alert('Error al agregar empleado');
      },
    });
  }

  editarEmpleado() {
    console.log(this.empleadoForm.value);
    this.empleadosService
      .editarEmpleado(this.idRoute, this.empleadoForm.value)
      .subscribe({
        next: (res) => {
          alert('Empleado editado');
        },
        error: () => {
          alert('Error al editar empleado');
        },
      });
  }

  RouteCheck() {
    if (this.router.url.includes(';id')) {
      return true;
    } else {
      return false;
    }
  }

  volver() {
    this.router.navigate(['/lista']);
  }
}
