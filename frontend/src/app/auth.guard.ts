import { Router } from "@angular/router";
import { AuthStoreService } from "./api-services/auths/auth.store.service";
import { inject } from "@angular/core";

export const authGuard = () => {
    const authService = inject(AuthStoreService);
    const router = inject(Router);
    if (!authService.isLoggedIn()) {
        router.navigate(['/auths/login']);
        return false;
    }
    return true;
};

export const homeGuard = () => {
    const authService = inject(AuthStoreService);
    const router = inject(Router);
    if (authService.isLoggedIn()) {
        router.navigate(['/']);
        return false;
    }
    return true;
};