import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthCanActivateGuard } from './auth.guard'
import { AuthService } from '../services/'

describe('Authentication Guard suite', () => {
    let guard: AuthCanActivateGuard
    let authService: AuthService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthCanActivateGuard,
                {
                    provide: AuthService,
                    useValue: { isAuthenticated: true }
                }
            ]
        });
        guard = TestBed.inject(AuthCanActivateGuard)
        authService = TestBed.inject(AuthService)
    })

    it('should allow to navigate to a screen', () => {
        expect(guard).toBeTruthy()
    })

    it('should return true if user is authenticated', () => {
        authService.isAuthenticated = true
        const activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
        const routerStateSnapshot = {} as RouterStateSnapshot;
        const canActive = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)
        expect(canActive).toBe(true)
    })

    it('should return false if user is NOT authenticated', () => {
        authService.isAuthenticated = false
        const activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
        const routerStateSnapshot = {} as RouterStateSnapshot;
        const canActive = guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)
        expect(canActive).toBe(false)
    })
})
