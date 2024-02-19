import { Component } from '@angular/core';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {

  public sidebarItems = [
    { label: 'Productos', icon: 'inventory', url: './products' },
    { label: 'Usuarios', icon: 'group', url: './users' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];

}
