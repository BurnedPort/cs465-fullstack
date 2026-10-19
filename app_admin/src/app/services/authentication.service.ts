import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
              private tripDataService: TripDataService) {}

  getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  logout(): void {
    this.storage.removeItem('travlr-token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return typeof payload.exp === 'number' && payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getCurrentUser(): User | null {
    if (!this.isLoggedIn()) return null;
    const { email, name } = JSON.parse(atob(this.getToken().split('.')[1]));
    return { email, name };
  }

  login(user: User, password: string): Observable<AuthResponse> {
    return this.tripDataService.login(user, password).pipe(tap(response => this.saveToken(response.token)));
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, password).pipe(tap(response => this.saveToken(response.token)));
  }
}
