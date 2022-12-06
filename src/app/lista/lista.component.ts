import {
  Component,
  Directive,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {
  EmpleadosService,
  Empleado,
  Producto,
  InfoProductos,
  God,
} from '../service/empleados.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit {
  public localVar: any;
  isClosed: boolean = true; // es true
  date = new FormControl(new Date().toISOString());
  productos: Producto[] = [];
  arrayService: [] = [];
  arraySalvacion: any[] = [];
  // arraySalvacion: MatTableDataSource<any[]> | undefined;
  // dataSource!: MatTableDataSource<[]> = [];
  promedioProduccion: any;
  // date = new FormControl(new Date().toISOString().slice(0, 10));
  // hour = new FormControl(new Date().toISOString().slice(11, 19));
  productoForm!: FormGroup;
  id_empleado: number = 0;
  totalCantidad: number = 0;
  totalCantidad2: number = 0;
  infoProductos: InfoProductos = {
    total: 0,
    promedio: 0,
    maximo: 0,
    minimo: 0,
  };
  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
    this.listarEmpleados();
    //Aquí se jalan todos los promedios, minimos y maximos
    this.empleadosService.getTotalCantidad().subscribe(
      (res) => {
        console.log(res);
        this.infoProductos.total = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.empleadosService.getPromedioCantidad().subscribe(
      (res) => {
        this.infoProductos.promedio = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.empleadosService.getMaximoLabor().subscribe(
      (res) => {
        this.infoProductos.maximo = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.empleadosService.getMinimoLabor().subscribe(
      (res) => {
        this.infoProductos.minimo = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Esto es para el html y la tabla, son las columnas
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellidos',
    'domicilio',
    'puesto',
    'sucursal',
    'sueldo',
    'editar',
    'eliminar',
    'status',
  ];
  // Este no se ocupa aclarar
  listarEmpleados() {
    this.empleadosService.getEmpleados().subscribe(
      (res) => {
        this.arrayService = res;
        this.listarPromedioProduccionEmpleado(this.arrayService);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Al eliminar empleado lo borramos de la base de datos al decirle a la api que ejecute el controlador que elimina el id que le enviamos, y despues nos devuelva a la página de la lista
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
  //editar claro esta
  editarUsuarioLista(id: number) {
    // this.empleadosService.editarEmpleado(id).subscribe();
    this.router.navigate(['/form/', { id: id }]);
  }

  //Al presionar una fila de la tabla este metodo abre la nueva interfaz de productos, este es el responsable de cargar la info
  clickedRow(row: any) {
    this.id_empleado = row.id;
    this.productoForm.setValue({
      nombre: row.nombre,
      fecha: this.date.value,
      // hora: this.date.value,
      cantidad: '',
    });
    this.getProductos();
    this.isClosed = false;
    this.giveMeFckMoney(this.id_empleado);
  }

  //Esta funcion es la responsable de traer los registros de produccion del empleado y se muestren
  getProductos() {
    this.empleadosService.getProducto(this.id_empleado).subscribe(
      (res) => {
        console.log(res);
        this.productos = res;
        console.log(this.productos);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Esta funcion es la responsable de agregar registros de produccion al empleado
  addProducto() {
    const tiempoRegistro = this.date.value;
    let newObjectProducto = this.productoForm.value;
    newObjectProducto = {
      empleado: this.id_empleado,
      fecha: tiempoRegistro?.slice(0, 10),
      hora: tiempoRegistro?.slice(11, 16),
      cantidad: newObjectProducto.cantidad,
    };
    this.productos.push(newObjectProducto);

    this.empleadosService.addProducto(newObjectProducto).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Esta funcion es la responsable de eliminar registros de produccion al empleado
  deleteProducto(id: any) {
    this.empleadosService.borrarProducto(id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    const indexOfObject = this.productos.findIndex((object) => {
      return object.id === id;
    });
    this.productos.splice(indexOfObject, 1);
  }

  //Esta funcion agarra el arreglo principal que obtengo de la base de datos y modifica objeto por objeto para agregarle su promedio a su respectivo empleado, lo hice así pq no había tiempo y no tenía chance de modificar la api
  listarPromedioProduccionEmpleado(array: any) {
    array.map((arrN: any) => {
      this.empleadosService.getPromedioEmpleado(arrN['id']).subscribe(
        (res) => {
          const resultado = res;
          this.arraySalvacion = [
            ...this.arraySalvacion,
            { ...arrN, status: resultado },
          ];
          console.log(resultado);

          console.log(this.arraySalvacion);
        },
        (err) => {}
      );
    });
  }

  //Esta funcion la hice de ultimo momento, es para tomar el total de produccion de empleado y mostrarla en la interfaz oscura de produccion para compararla con los cuadros de promedios
  giveMeFckMoney(id: number) {
    this.empleadosService.getTotalEmpleado(id).subscribe(
      (res) => {
        let preGuardado = res;
        this.totalCantidad = preGuardado;
      },
      (err) => {
        let preGuardado = err;
        this.totalCantidad = preGuardado;
      }
    );
  }
}
