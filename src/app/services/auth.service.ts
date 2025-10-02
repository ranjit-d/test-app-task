import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private TOKEN_KEY = 'sessionToken';
  private USER_KEY = 'userData';

  constructor(private router: Router) {}

  // Save token & user data
  setSession(token: string, userData: any): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  // Get user data
getUser(): any {
  const user = localStorage.getItem(this.USER_KEY);
  return user ? JSON.parse(user) : null;
}
}