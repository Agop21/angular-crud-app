import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanActivateEditGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if running in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      const currentUrl = state.url;

      // Check for direct access (no previous navigation within the app)
      const navigationHistory = window.history.state;
      const hasPreviousNavigation =
        navigationHistory && navigationHistory.navigationId > 0;

      if (currentUrl.startsWith('/updateEmployee/') && !hasPreviousNavigation) {
        console.log('Direct access to edit page denied');
        this.router.navigate(['/contactlist']);
        return false;
      }
    }

    return true; // Allow access otherwise
  }
}
