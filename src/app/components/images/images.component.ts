import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {
  images: string[] = [
    'https://getbootstrap.com/docs/5.3/examples/features/unsplash-photo-1.jpg',
    'https://getbootstrap.com/docs/5.3/examples/features/unsplash-photo-2.jpg',
    'https://getbootstrap.com/docs/5.3/examples/features/unsplash-photo-3.jpg',
  ];

}
