import { Routes } from '@angular/router';
import { BookFlightRoute } from './app.constants'
import { isAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: BookFlightRoute.Init
    },
    {
        path: BookFlightRoute.Init,
        loadComponent: () => import('./pages/step-1-select-flight-options/select-flight-options.component')
            .then(m => m.SelectFlightOptionsComponent)
    },
    {
        path: BookFlightRoute.TakeOff,
        loadComponent: () => import('./pages/step-2-select-take-off-time/select-take-off-time.component')
            .then(m => m.SelectTakeOffTimeComponent),
        canActivate: [isAuthGuard]
    },
    {
        path: BookFlightRoute.PassengerInfo,
        loadComponent: () => import('./pages/step-3-passenger-info/passenger-info.component')
            .then(m => m.PassengerInfoComponent),
        canActivate: [isAuthGuard]
    },
    {
        path: BookFlightRoute.Payment,
        loadComponent: () => import('./pages/step-4-payment/payment.component')
            .then(m => m.PaymentComponent),
        canActivate: [isAuthGuard]
    },
    {
        path: '**',
        redirectTo: BookFlightRoute.Init
    }
];
