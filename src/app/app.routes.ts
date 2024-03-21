import { Routes } from '@angular/router';
import { AssignedComponent } from './components/assigned/assigned.component';
import { ImagesComponent } from './components/images/images.component';

export const routes: Routes = [
    {
        path: 'images',
        component: ImagesComponent

    },
    {
        path: 'assigned',
        component: AssignedComponent

    }
];
