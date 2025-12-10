import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/**
 * Auth Store service that handles the CRUD operation for the AUTH tokens
 */
export class AuthStoreService {

    private readonly STORAGE_KEY: string = "x-auth-token";

    public setSession(token: string): void {
        return window.localStorage.setItem(this.STORAGE_KEY, btoa(token));
    }

    public isLoggedIn(): boolean {
        return this._exist();
    }

    public getToken(): string | null {
        let rawString: string | null = window.localStorage.getItem(this.STORAGE_KEY);
        return rawString;
    }

    public invalidateSession(): void {
        this._clear();
    }

    private _clear(): void {
        return window.localStorage.removeItem(this.STORAGE_KEY);
    }

    private _exist(): boolean {
        return window.localStorage.getItem(this.STORAGE_KEY) != null;
    }
}