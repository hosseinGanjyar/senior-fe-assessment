import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
      },
    },
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  baseUrl: string =
    'https://vst-test-images.s3.ap-southeast-1.amazonaws.com/sfe-images/';
  loading: boolean = true;
  hasError: boolean = false;
  reloading: boolean = false;
  isFullScreen: boolean = false;


  @Input() imgName!: string;
  @Input() hasAssigned: boolean = false;

  @Output() toggleAssignImage: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  onload() {
    this.loading = false;
  }

  onError() {
    this.hasError = true;
    this.loading = false;
  }

  reloadImage() {
    // reset component
    this.hasError = false;
    this.loading = true;
    this.reloading = true;

    setTimeout(() => {
      this.reloading = false;
    }, 0);
  }

  onToggleAssignImage(imageName: string) {
    this.toggleAssignImage.emit(imageName);
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreen ? this.renderer.addClass(document.body, 'overflow-hidden') : this.renderer.removeClass(document.body, 'overflow-hidden');
  }

}
