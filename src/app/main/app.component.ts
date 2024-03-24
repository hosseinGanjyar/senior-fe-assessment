import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FileService } from '../shared/services/file/file.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'senior-fe-assessment';

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit() { }
}
