import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RoleType,
  UpdateProfileRequest,
  UpdateRoleRequest,
  User,
} from '../../core/interfaces/user';
import { Page } from '../../core/interfaces/page';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/user';

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/get-user/${id}`);
  }

  getAllUsers(): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.baseUrl}/get-all`);
  }

  getUsersByRole(role: RoleType): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.baseUrl}/get-all/${role}`);
  }

  getActiveUsers(): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.baseUrl}/get-active`);
  }

  toggleUserStatus(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  changeRole(request: UpdateRoleRequest): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/change-role`, request);
  }

  updateProfile(id: string, request: UpdateProfileRequest): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}/profile`, request);
  }
}