import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RoleType, UpdateProfileRequest, User } from '../../core/interfaces/user';
import { UserService } from '../../shared/services/user-service';

@Service()
export class AuthService {
  private userService = inject(UserService);

  private readonly _user = signal<User>({
    id: 'dd6a6e54-1846-43c9-b19d-708f7d3c3eb7',
    username: 'johndoe_dev',
    email: 'john.doe@example.com',
    role: RoleType.SELLER,
  });

  readonly user = this._user.asReadonly();

  getUser() {
    return this._user();
  }

  updateProfile(request: UpdateProfileRequest): Observable<User> {
    return this.userService
      .updateProfile(this._user().id, request)
      .pipe(tap((updated) => this._user.set(updated)));
  }

  updateUserRole(id: string, role: RoleType) {
    console.log('changed role');
  }

  login(payload: any) : Observable<any>{
    return new Observable();
  }

  register(payload: any) : Observable<any>{
    return new Observable();
  }
}