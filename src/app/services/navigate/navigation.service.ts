import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {

    constructor(private router: Router) { }

    navigateToLocal(url: string) {
        this.router.navigate([url])
    }

}
