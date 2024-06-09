import { Routes } from '@angular/router';
import { FlightsBookingRoute } from './app.constants'
import { isAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: FlightsBookingRoute.StepOne
    },
    {
        path: FlightsBookingRoute.StepOne,
        loadComponent: () => import('./pages/step-1-select-flight-options/select-flight-options.component')
            .then(m => m.SelectFlightOptionsComponent)
    },
    {
        path: FlightsBookingRoute.StepTwo,
        loadComponent: () => import('./pages/step-2-select-take-off-time/select-take-off-time.component')
            .then(m => m.SelectTakeOffTimeComponent),
        // canActivate: [isAuthGuard]
    },
    {
        path: FlightsBookingRoute.StepThree,
        loadComponent: () => import('./pages/step-3-passenger-info/passenger-info.component')
            .then(m => m.PassengerInfoComponent),
        canActivate: [isAuthGuard]
    },
    {
        path: FlightsBookingRoute.StepFour,
        loadComponent: () => import('./pages/step-4-payment/payment.component')
            .then(m => m.PaymentComponent),
        canActivate: [isAuthGuard]
    },
    {
        path: '**',
        redirectTo: FlightsBookingRoute.StepOne
    }
];
