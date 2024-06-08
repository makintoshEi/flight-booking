import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthService, NavigationService } from "../services/";
import { BookFlightRoute } from "../app.constants";

@Injectable({ providedIn: 'root' })
export class AuthCanActivateGuard {
    authService = inject(AuthService)
    navigationService = inject(NavigationService)

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        console.log(this.authService.isAuthenticated.getValue())
        if (this.authService.isAuthenticated.getValue()) {
            return true
        } else {
            this.navigationService.navigateToLocal(BookFlightRoute.Init)
            return false
        }
    }
}

export const isAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthCanActivateGuard).canActivate(route, state)
}
