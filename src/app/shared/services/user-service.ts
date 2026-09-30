import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RoleType,
  UpdateProfileRequest,
  UpdateRoleRequest,
  User,
} from '../../core/interfaces/User';
import { Page, PageParams } from '../../core/interfaces/Page';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/get-user/${id}`);
  }

  getAllUsers(pageParams: PageParams = {}): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.baseUrl}/get-all`, {
      params: this.toParams(pageParams),
    });
  }

  getUsersByRole(role: RoleType, pageParams: PageParams = {}): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.baseUrl}/get-all/${role}`, {
      params: this.toParams(pageParams),
    });
  }

  getActiveUsers(pageParams: PageParams = {}): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${this.baseUrl}/get-active`, {
      params: this.toParams(pageParams),
    });
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

  private toParams({ page, size, sort }: PageParams): HttpParams {
    let params = new HttpParams();
    if (page !== undefined) params = params.set('page', page);
    if (size !== undefined) params = params.set('size', size);
    if (sort) params = params.set('sort', sort);
    return params;
  }
}
