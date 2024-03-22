import { Routes } from '@angular/router';
import { AssignedComponent } from './components/assigned/assigned.component';
import { UnAssignedComponent } from './components/un-assigned/un-assigned.component';

export const routes: Routes = [
    {
        path: 'images',
        component: UnAssignedComponent

    },
    {
        path: 'assigned',
        component: AssignedComponent

    }
];
