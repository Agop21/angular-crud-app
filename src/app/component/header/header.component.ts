import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() homePageButton: boolean = true;
  @Input() addEmployeeBtn: boolean = true;
}
