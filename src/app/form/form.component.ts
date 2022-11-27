import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../service/empleados.service';

interface Sucursales {
  value: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private empleadosService: EmpleadosService
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

  //   'id',
  // 'nombre',
  // 'apellidos',
  // 'domicilio',
  // 'puesto',
  // 'sucursal',
  // 'sueldo',
  // 'prioridad',
}
