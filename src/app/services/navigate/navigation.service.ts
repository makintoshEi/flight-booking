import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {

    constructor(private router: Router, private location: Location) { }

    navigateToLocal(url: string) {
        this.router.navigate([url])
    }

    goBack() {
        this.location.back()
    }

}
