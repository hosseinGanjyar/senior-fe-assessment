import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assigned',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigned.component.html',
  styleUrl: './assigned.component.scss'
})
export class AssignedComponent {
  images: string[] = [
    'https://getbootstrap.com/docs/5.3/examples/features/unsplash-photo-1.jpg',
    'https://getbootstrap.com/docs/5.3/examples/features/unsplash-photo-2.jpg',
    'https://getbootstrap.com/docs/5.3/examples/features/unsplash-photo-3.jpg',
  ];


  constructor() { }

  ngOnInit() {
  }

}
