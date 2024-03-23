import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from './app.routes';
import { FileService } from './shared/services/file/file.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER, useFactory: (fileService: FileService) => {
        return (): Observable<void> => {
          return fileService.loadImageNameList();
        };
      }
      ,
      deps: [FileService], multi: true
    }
  ]
};

