import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RoleType, UpdateProfileRequest, User } from '../../core/interfaces/user';
import { UserService } from '../../shared/services/user-service';

export interface LoginRequest {
  credential: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';
const AUTH_URL = 'http://localhost:8080/auth';

const GUEST_USER: User = {
  id: '',
  username: '',
  email: '',
  role: '' as unknown as RoleType,
};

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function loadSession(): { token: string | null; user: User } {
  const user = readStoredUser();
  const token = localStorage.getItem(TOKEN_KEY);
  return user && token ? { token, user } : { token: null, user: GUEST_USER };
}

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private userService = inject(UserService);

  private readonly initial = loadSession();
  private readonly _token = signal<string | null>(this.initial.token);
  private readonly _user = signal<User>(this.initial.user);

  readonly user = this._user.asReadonly();
  readonly role = computed(() => this._user().role);
  readonly userId = computed(() => this._user().id);
  readonly isAuthenticated = computed(() => !!this._token() && this._user().id !== '');

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${AUTH_URL}/log-in`, request)
      .pipe(tap((res) => this.setSession(res)));
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${AUTH_URL}/sign-up`, request)
      .pipe(tap((res) => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._user.set(GUEST_USER);
  }

  getToken(): string | null {
    return this._token();
  }

  getUser(): User {
    return this._user();
  }

  requireUser(): User {
    if (!this.isAuthenticated()) throw new Error('No authenticated user');
    return this._user();
  }

  homeRoute(): string {
    switch (this._user().role) {
      case RoleType.ADMIN:
        return '/admin';
      case RoleType.SELLER:
        return '/seller';
      default:
        return '/';
    }
  }

  updateProfile(request: UpdateProfileRequest): Observable<User> {
    return this.userService
      .updateProfile(this._user().id, request)
      .pipe(tap((updated) => this.storeUser(updated)));
  }

  updateUserRole(id: string, role: RoleType) {
    console.log('changed role');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  hasRole(roles: RoleType[]): boolean {
    return roles.includes(this._user().role);
  }

  private setSession(res: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, res.accessToken);
    this._token.set(res.accessToken);
    this.storeUser(res.user);
  }

  private storeUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }
}