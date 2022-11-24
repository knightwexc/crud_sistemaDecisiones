import { Component, OnInit } from '@angular/core';

interface Sucursales {
  value: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  hide = true;
  sucursales: Sucursales[] = [
    { value: 'Culiacán' },
    { value: 'Mazatlán' },
    { value: 'Nuevo León' },
  ];
}
